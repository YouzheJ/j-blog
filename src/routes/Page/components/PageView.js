import React from 'react'
import Helmet from 'react-helmet'
import './PageView.scss'

export const PageView = () => (
  <div>
    <Helmet title='Page' />
    <div className='page-wrapper'>
      {/* <div className='page-list'>list</div>
      <div className='page-nav'>nav</div> */}
      <div className='page-center'>
        {/* <div className='page-title'>标题标题</div>
        <div className='page-tags'>
          <ul>
            <li className='tag-item'>tag</li>
            <li className='tag-item'>tag</li>
            <li className='tag-item'>tag</li>
          </ul>
        </div>
        <div className='page-detail'>
          <span>游者J</span>
          <span>2018-02-26 11:22</span>
        </div>
        <div className='page-content'>content</div> */}
      </div>
    </div>
  </div>
)

export default PageView
