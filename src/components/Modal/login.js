import React from 'react'
import './index.scss'
import { fetch2 } from '../../utils'
import constant from '../../constant'

const { LOGIN_POST } = constant.api;

export default class Login extends React.Component {
  static open () {
    this.instance.setState({
      visible: true,
    });
  }
  constructor(props) {
      super(props);
      this.state = {
        visible: false,
      }
  }
  close = () => {
    this.setState({
      visible: false,
    });
  }
  componentDidMount() {

  }
  render() {
    const { visible } = this.state;
    return (
      <div className='Modal' style={{display: visible ? 'block' : 'none'}}>
        <div className='ModalMask'></div>
          <div className='ModalContainer LoginContainer'>
            <LoginContent closeModal={this.close}/>
          </div>
      </div>
        )
    }
}

class LoginContent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        pwd: '',
      }
  }
  login = (userName, password) => {
    fetch2(LOGIN_POST, {
      method: 'post',
      data: JSON.stringify({
        userName,
        password,
      }),
    })
    .then((res) => {
      console.log(res);
      if (res && res.success) {
        this.props.closeModal();
      } else {

      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  onChange = (type) => (e) => {
    this.setState({[type]: e.target.value});
  }
  onLogin = (e) => {
    // console.log(e);
    const { name, pwd } = this.state;
    this.login(name, pwd);
  }
  render() {
    const { name, pwd } = this.state;
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
              <input value={name} onChange={this.onChange('name')} />
            </div>
          </div>
          <div className='contentItem'>
            <span className='itemLabel'>密码：</span>
            <div className='itemContent'>
              <input type='password' value={pwd} onChange={this.onChange('pwd')} />
            </div>
          </div>
          {/* <div className='contentItem'>
            <span className='itemLabel'>验证码：</span>
            <div className='itemContent'>
              <input type='password' />
            </div>
          </div> */}
        </div>
        <div className='footer'>
          <button className='btn loginBtn' onClick={this.onLogin}>登陆</button>
          <button className='btn cancelBtn'>取消</button>
        </div>
      </div>
    )
  }
}