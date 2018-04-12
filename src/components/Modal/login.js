import React from 'react'
import './index.scss'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
  render() {
    return (
      <div className='Modal'>
        <div className='ModalMask'>aa</div>
          <div className='ModalContainer LoginContainer'>
            <LoginContent />
          </div>
      </div>
        )
    }
}

class LoginContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
  render() {
    return (
      <div className='loginWrapper'>
        <div className='header'>
          <span className='titleText'>登陆</span>
          <span className='closeBtn'>x</span>
        </div>
        <div className='content'>
          <div className='contentItem'>
            <span className='itemLabel'>用户名：</span>
            <div className='itemContent'>
              <input />
            </div>
          </div>
          <div className='contentItem'>
            <span className='itemLabel'>密码：</span>
            <div className='itemContent'>
              <input type='password' />
            </div>
          </div>
          <div className='contentItem'>
            <span className='itemLabel'>验证码：</span>
            <div className='itemContent'>
              <input type='password' />
            </div>
          </div>
        </div>
        <div className='footer'>
          <button className='btn loginBtn'>登陆</button>
          <button className='btn cancelBtn'>取消</button>
        </div>
      </div>
    )
  }
}