import React from 'react'
import Helmet from 'react-helmet'
import './EditView.scss'
const showdown = window.showdown

class EditView extends React.Component {
  converter = null
  constructor (props) {
    super(props)
    this.state = {
      viewContent: `
      <h1 id="标题">标题</h1>
      <h2 id="标题2">标题2</h2>
      <h3 id="标题3">标题3</h3>
      <h4 id="标题4">标题4</h4>
      <h5 id="标题5">标题5</h5>
      <h6 id="标题6">标题6</h6>
      <ul>
      <li>aa</li>
      <li>bb</li>
      </ul>
      <hr>
      <p><img src="https://img.alicdn.com/imgextra/i4/503912635/TB2m.FJoBTH8KJjy0FiXXcRsXXa_!!503912635.jpg" alt="baidu"><img src="http://aims.17zwd.com/nsys/42/a5dcb25b16870972d158e8615ae4863c.jpg" alt="baidu"></p>
      <pre><code>function test () {
       // todo
      }</code></pre>
      <table>
      <thead>
      <tr>
      <th id="33">33</th>
      <th id="33">33</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>33</td>
      <td>33</td>
      </tr>
      <tr>
      <td>33</td>
      <td>33</td>
      </tr>
      <tr>
      <td>33</td>
      <td>33</td>
      </tr>
      </tbody>
      </table>
      <ol>
      <li>aa</li>
      <li>aa<ol>
      <li>aa</li>
      <li>aa<ol>
      <li>aa</li>
      <li>aa<ol>
      <li>a</li>
      <li>aa</li></ol></li></ol></li></ol></li>
      </ol>`,
      mdText: ''
    }
  }
  onChange = (e) => {
    let value = e.target.value
    this.setState({viewContent: this.converter.makeHtml(value), mdText: value})
  }
  onKeyDown = (e) => {
    let { value, selectionStart, selectionEnd } = e.target
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault()
      value = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd)
      e.target.selectionEnd = selectionStart + 1
      this.setState({mdText: value})
    }
  }
  componentWillMount () {
    this.converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      simpleLineBreaks: true,
      omitExtraWLInCodeBlocks: true,
      customizedHeaderId: true // ## Sample header {real-id}     will use real-id as id
    })
    this.converter.setFlavor('github')
    this.converter.setOption('simplifiedAutoLink', true)
  }
  render () {
    const { mdText, viewContent } = this.state
    return (
      <div className='edit-page clearfix'>
        <Helmet title='Edit' />
        <div className='edit-wrapper'>
          <div className='edit-content'>
            <textarea
              className='edit-area'
              placeholder='markdown editor'
              value={mdText}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
            />
          </div>
        </div>
        <div className='view-wrapper'>
          <div className='view-content'>
            <p className='view-title'>预览</p>
            <div className='md-wrapper'>
              {
                <div
                  className='md-base'
                  dangerouslySetInnerHTML={{__html: viewContent}}
                />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditView
