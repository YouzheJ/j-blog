import React from 'react'
import Link from 'next/link'
import './Header.scss'

export const Header = () => (
  <div className='header clearfix'>
    <div className='header-wrapper'>
      <div className='blog-icon'>
        <Link href='/'>YOUZHEJ</Link>
      </div>
      <ul className='header-list clearfix'>
        <li>
          <Link href='/list'>
            <a><i className='iconfont icon-navlist' /></a>
          </Link>
        </li>
        <li>
          <Link href='/edit'>
            <a><i className='iconfont icon-survey' /></a>
          </Link>
        </li>
      </ul>
    </div>
  </div>
)

export default Header
