import React from 'react'
import Helmet from 'react-helmet'
import './EditView.scss'
const showdown = window.showdown

class EditView extends React.Component {
  converter = null
  constructor (props) {
    super(props)
    this.state = {
      viewContent: `<div class="md-base" data-reactid="24"><h1 id="标题">标题</h1>
      <ul>
      <li>aa</li>
      <li>bb</li>
      </ul>
      <hr>
      <pre><code>function test () {
       // todo
      }</code></pre></div>`
    }
  }
  onChange = (e) => {
    let value = e.target.value
    console.log(value)
    this.setState({viewContent: this.converter.makeHtml(value)})
  }
  componentWillMount () {
    this.converter = new showdown.Converter()
    this.converter.setFlavor('github')
  }
  render () {
    const { viewContent } = this.state
    return (
      <div className='edit-page clearfix'>
        <Helmet title='Edit' />
        <div className='edit-wrapper'>
          <div className='edit-content'>
            <textarea
              className='edit-area'
              placeholder='markdown editor'
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className='view-wrapper'>
          <div className='view-content'>
            <p className='view-title'>预览</p>
            {
              <div
                className='md-base'
                dangerouslySetInnerHTML={{__html: viewContent}}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default EditView
