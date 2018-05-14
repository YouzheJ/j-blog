import React from 'react'
import Router from 'next/router'
import './edit.scss'
import showdown from 'showdown'
import constant from '../../constant'
import { isArray } from '@youzhej/jutils/src'
import { fetch2 } from '../../utils'
import LoginModal from '../Modal/login'

const { SAVE_DATA, PAGE_GET, CHECK_LOGIN, UPDATE_DATA } = constant.api;
const { BASEINFO_REG, FILTER_TAGS } = constant.reg;

class EditView extends React.Component {
  converter = null
  baseInfo = {
    title: '标题',
    tags: ['标签1（最多5个）', '标签2'],
    categories: ['目录1（最多5个）', '目录2'],
    matchStr: '---\ntitle: 标题\ntags:\n- 标签1（最多5个）\n- 标签2\ncategories:\n- 目录1（最多5个）\n- 目录2\n---', // 基础信息的md
  }
  constructor (props) {
    super(props)
    this.state = {
      viewContent: '',
      page_id: '',
      mdText: this.baseInfo.matchStr
    }
  }
  onChange = (e) => {
    let value = this.filterTags(e.target.value)
    this.setViewContent(value);
  }
  convertBaseInfo2Html = (baseInfo) => {
    let html = `<div class='base-info'>`
    if (baseInfo) {
      const { title, tags, categories } = baseInfo
      title && (html += `<h3 class='page-title'>${title}</h3>`)
      if (tags && isArray(tags) && tags.length) {
        html += `<ul class='tag-list'>`
        tags.map((tag) => {
          html += `<li class='tag-item'><span class='text' title=${tag}>${tag}</span></li>`
        })
        html += '</ul>'
      }
      html += `<div class='page-detail'>
      <span>游者J</span>
      <span>${this.formatDate()}</span>
    </div>`
    }
    return html + '</div>'
  }
  formatDate = () => {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    let h = date.getHours()
    let min = date.getMinutes()
    let s = date.getSeconds()
    let day = date.getDay()
    return `${y}-${this.addZero(m)}-${this.addZero(d)} ` + 
    `${this.addZero(h)}:${this.addZero(min)}:${this.addZero(s)} ${this.getDay(day)}`;
  }
  getDay = (num) => {
    switch (num) {
      case 0: return '星期天'
      case 1: return '星期一'
      case 2: return '星期二'
      case 3: return '星期三'
      case 4: return '星期四'
      case 5: return '星期五'
      case 6: return '星期六'
      default: return ''
    }
  }
  addZero = (num, max = 10) => {
    return num < 10 ? '0' + num : num
  }
  getBaseInfo = (str = '') => {
    let obj = {
      title: '',
      tags: [],
      categories: [],
      matchStr: ''
    }
    let matchRes = str.match(BASEINFO_REG)
    if (matchRes) {
      obj.matchStr = matchRes[0]
      obj.title = matchRes[1].trim()
      obj.tags = this.getBaseInfoPart(matchRes[2])
      obj.categories = this.getBaseInfoPart(matchRes[3])
    }
    return obj
  }
  getBaseInfoPart = (str = '') => {
    let result = []
    let arr = str.split(/\n+/)
    arr.map((item, index) => {
      if (result.length < 5) { // 只取5个
        let res = item.replace(/[-\s]*/g, '')
        res && !~result.indexOf(res) && result.push(res)
      }
    })
    return result
  }
  // 过滤掉部分标签
  filterTags = (str = '') => {
    return str.replace(FILTER_TAGS, '')
  }
  onKeyDown = (e) => {
    let { value, selectionStart, selectionEnd } = e.target
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault()
      value = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd)
      e.target.selectionEnd = selectionStart + 1
      this.setState({mdText: value})
    }
  }
  onSave = () => {
    const { title, tags, categories, matchStr } = this.baseInfo;
    const { mdText, page_id } = this.state;
    let url = SAVE_DATA;
    let data = {
      author: '游者J',
      title,
      tags,
      categories,
      baseMD: matchStr,
      detailMD: mdText.replace(matchStr, ''),
    };
    if (page_id) {
      url = UPDATE_DATA;
      data.page_id = page_id;
    }
    fetch2(url, {
      method: 'post',
      data: JSON.stringify(data)
    })
    .then(res => {
      if (res && res.success && res.data) {
        Router.push(`/page?id=${page_id || res.data}`);
      } else if (res && res.code === 401) {
        LoginModal.open(this.onSave);
      } else {
        alert(res && res.message || '保存失败，请稍后重试');
      }
    })
    .catch(err => {
      console.log(err)
      alert(err.message);
    });
  }
  checkLogin = (cb) => {
    return new Promise((resolve, reject) => {
      fetch2(CHECK_LOGIN, {
        method: 'get'
      })
        .then((res) => {
          if (res && res.success) {
            resolve();
          } else {
            LoginModal.open(cb);
            reject();
          }
        })
        .catch((err) => {
          console.log(err);
          LoginModal.open(cb);
          reject();
        });
    });
  }
  getEditData = (pageId) => {
    return new Promise((resolve, reject) => {
      fetch2(`${PAGE_GET}?pageid=${pageId}`, {
        method: 'get'
      })
        .then((res) => {
          if (res && res.success && res.data) {
            this.setState({page_id: pageId});
            this.setViewContent(res.data.base_md + res.data.detail_md || '');
          } else if (res && res.code === 401) {
            LoginModal.open(this.getEditData);
          } else {
            alert(res && res.message || '获取数据失败');
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    });
  }
  setViewContent = (value) => {
    // 截取开头的标题，标签，目录等部分
    this.baseInfo = this.getBaseInfo(value)
    let viewContent = this.convertBaseInfo2Html(this.baseInfo) +
                      this.converter.makeHtml(value.replace(this.baseInfo.matchStr, ''))
    this.setState({viewContent, mdText: value})
  }
  componentWillMount () {
    // 初始化showdown
    this.converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      simpleLineBreaks: true,
      omitExtraWLInCodeBlocks: true,
      customizedHeaderId: true // ## Sample header {real-id}     will use real-id as id
    })
    this.converter.setFlavor('github')
    this.converter.setOption('simplifiedAutoLink', true)
    // 
    const { query } = this.props;
    const pageId = Number(query.id);
    let viewContent = this.convertBaseInfo2Html(this.baseInfo);
    this.setState({viewContent});
    const checkCb = () => !isNaN(pageId) && this.getEditData(pageId);
    this.checkLogin(checkCb).then(checkCb);
  }
  render () {
    const { mdText, viewContent } = this.state
    return (
      <div className='edit-page clearfix'>
        <LoginModal ref={(component) => LoginModal.instance = component}/>
        <div className='edit-wrapper'>
          <div className='edit-content'>
            <textarea
              className='edit-area'
              placeholder='markdown editor'
              value={mdText}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
            />
          </div>
        </div>
        <div className='view-wrapper'>
          <div className='view-content'>
            <p className='view-title'>预览<span className='btn save-btn' onClick={this.onSave}>保存</span></p>
            <div className='md-wrapper'>
              {
                <div
                  className='md-base'
                  dangerouslySetInnerHTML={{__html: viewContent}}
                />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditView