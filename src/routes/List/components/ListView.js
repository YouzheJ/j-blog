import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import './ListView.scss'
import constant from '../../../constant'
import axios from 'axios'

const { LIST_GET, DELETE_PAGE } = constant.api;

class ListView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }
  getListData = (index) => {
    return new Promise((resolve, reject) => {
      axios.get(`${LIST_GET}?index=${index}`)
        .then(({data}) => {
          if (data && data.success && data.data) {
            resolve(data.data)
          } else {
            resolve({});
          }
        })
        .catch((err) => {
          // 重定向到500页
          resolve({});
        });
    });
  }
  deletePage = (pageId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${DELETE_PAGE}?page_id=${pageId}`)
      .then(({data}) => {
        if (data && data.success && data.data) {
          resolve(data.data)
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        // 重定向到500页
        resolve({});
      });
    });
  }
  editClick = (pageId) => {
    const { history } = this.props;
    history.push(`/edit?id=${pageId}`);
  }
  delClick = (pageId, title) => {
    if (window.confirm(`确定要删除文章：${title}`)) {
      this.deletePage(pageId).then((res) => {
        console.log(res);
      });
    }
  }
  createList = (item) => (
    <li className='list-item' key={item.id}>
      <div className='item-content'>
        <div className='title'><Link to={`/page?id=${item.id}`}>{item.title}</Link></div>
        <div className='btn-group'>
          <span className='item-btn edit-btn' onClick={() => this.editClick(item.id)}>
            <i className='iconfont icon-edit'></i>
          </span>
          <span className='item-btn del-btn' onClick={() => this.delClick(item.id, item.title)}>
            <i className='iconfont icon-delete'></i>
          </span>
        </div>
        <div className='item-bottom'>
          <div className='bottom-left'>
            <div className='tags'>tag: <span>{item.tags}</span></div>
          </div>
          <div className='bottom-right'>
            <span>{item.created}</span>
          </div>
        </div>
      </div>
    </li>
  )
  componentDidMount () {
    const { updateList, location } = this.props;
    let index = Number(location.query.index);
    isNaN(index) && (index = 0);
    this.getListData(index).then((res) => updateList(res));
  }
  render () {
    const { total, list } = this.props.list;
    return (<div>
      <Helmet title='List' />
      <div className='list-wrapper'>
        <div className='list-header'>
          <div className='title'>youzheJ-blog</div>
          <p className='slogan'>什么都想学学，什么都要写写。</p>
          <div className='logo'></div>
        </div>
        <div className='list-content'>
          <div className='page-list-wrapper'>
            <ul className='page-list'>
            {
              list && list.length && list.map(this.createList)
            }
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default ListView
