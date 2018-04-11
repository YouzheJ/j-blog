import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import LoginModal from '../../components/Modal/login'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <LoginModal ref={(component) => LoginModal.instance = component}/>
    <Header />
    <div className='mainContainer'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
