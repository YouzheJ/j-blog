import React from 'react'
import './index.scss'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount () {

    }
    render () {
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
    render () {
        return (
            <div className='loginWrapper'>
                <div className='header'>登陆</div>
                <div className='content'></div>
                <div className='footer'></div>
            </div>
        )
    }
}