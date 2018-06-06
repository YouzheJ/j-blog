import React from 'react'
import './IndexView.scss'
import Router from 'next/router'

class IndexView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  componentDidMount () {
    Router.push('/list');
  }
  render () {
    return (
      <div></div>
    )
  }
}

export default IndexView
