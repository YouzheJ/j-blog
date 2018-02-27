import React from 'react'
import Helmet from 'react-helmet'
import './EditView.scss'
import showdown from 'showdown'
import constant from '../../../constant'
import { isArray } from '@youzhej/jutils/src'
import { fetch2 } from '../../../utils'

const { SAVE_DATA } = constant.api;
const { BASEINFO_REG, FILTER_TAGS } = constant.reg;

class EditView extends React.Component {
  converter = null
  baseInfo = {
    title: '标题',
    tags: ['标签1（最多5个）', '标签2'],
    categories: ['目录1（最多5个）', '目录2'],
    matchRes: '---\ntitle: 标题\ntags:\n- 标签1（最多5个）\n- 标签2\ncategories:\n- 目录1（最多5个）\n- 目录2\n---'
  }
  constructor (props) {
    super(props)
    this.state = {
      viewContent: '',
      mdText: this.baseInfo.matchRes
    }
  }
  onChange = (e) => {
    let value = this.filterTags(e.target.value)
    // 截取开头的标题，标签，目录等部分
    this.baseInfo = this.getBaseInfo(value)
    let viewContent = this.convertBaseInfo2Html(this.baseInfo) +
                      this.converter.makeHtml(value.replace(this.baseInfo.matchStr, ''))
    this.setState({viewContent, mdText: value})
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
    const { title, tags, categories, matchRes } = this.baseInfo;
    const { mdText } = this.state;
    fetch2(SAVE_DATA, {
      method: 'post',
      data: JSON.stringify({
        title,
        tags,
        categories,
        author: '游者J',
        useId: 521,
        baseInfo: matchRes,
        markdown: mdText
      })
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    });
  }
  componentWillMount () {
    this.converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      simpleLineBreaks: true,
      omitExtraWLInCodeBlocks: true,
      customizedHeaderId: true // ## Sample header {real-id}     will use real-id as id
    })
    this.converter.setFlavor('github')
    this.converter.setOption('simplifiedAutoLink', true)
    let viewContent = this.convertBaseInfo2Html(this.baseInfo)
    this.setState({viewContent})
  }
  render () {
    const { mdText, viewContent } = this.state
    return (
      <div className='edit-page clearfix'>
        <Helmet title='Edit' />
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
