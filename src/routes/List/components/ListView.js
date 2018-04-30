import React from 'react'
import Helmet from 'react-helmet'
import './ListView.scss'

export const ListView = () => (
  <div>
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
            <li className='list-item'>
              <div className='item-content'>
                <div className='title'>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
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
                    <div className='tags'>tag: <span>test2</span></div>
                  </div>
                  <div className='bottom-right'>
                    <span>2018-05-01 12:00</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default ListView
