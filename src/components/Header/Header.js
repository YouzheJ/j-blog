import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className='header clearfix'>
    <div className='header-wrapper'>
      <div className='blog-icon'>
        <IndexLink to='/' activeClassName='activeRoute'>YOUZHEJ</IndexLink>
      </div>
      <ul className='header-list clearfix'>
        <li>
          <Link to='/list' activeClassName='activeRoute'>
            <i className='iconfont icon-navlist' />
          </Link>
        </li>
        <li>
          <Link to='/edit' activeClassName='activeRoute'>
            <i className='iconfont icon-survey' />
          </Link>
        </li>
      </ul>
    </div>
  </div>
)

export default Header
