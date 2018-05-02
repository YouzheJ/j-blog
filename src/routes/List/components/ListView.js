import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import './ListView.scss'
import constant from '../../../constant'
import axios from 'axios'

const { LIST_GET } = constant.api;

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
              list && list.length && list.map(createList)
            }
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const createList = (item) => (
  <li className='list-item' key={item.id}>
    <div className='item-content'>
      <div className='title'><Link to={`/page?id=${item.id}`}>{item.title}</Link></div>
      <div className='btn-group'>
        <span className='item-btn edit-btn'>
          <i className='iconfont icon-edit'></i>
        </span>
        <span className='item-btn del-btn'>
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

export default ListView
