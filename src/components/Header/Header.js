import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className='header clearfix'>
    <div className='blog-icon'>
      <IndexLink to='/' activeClassName='activeRoute'>YOUZHEJ</IndexLink>
    </div>
    <ul className='header-list clearfix'>
      <li>
        <Link to='/list' activeClassName='activeRoute'>
        <i className="iconfont icon-navlist"></i>
        </Link>
      </li>
      <li>
        <Link to='/edit' activeClassName='activeRoute'>
          <i className="iconfont icon-survey"></i>
        </Link>
      </li>
    </ul>
  </div>
)

export default Header
