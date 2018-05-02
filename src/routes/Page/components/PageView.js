import React from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import './PageView.scss'
import constant from '../../../constant'

const { PAGE_GET } = constant.api;

let dangerHtml = '';

class PageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  getPageData = (pageId) => {
    return new Promise((resolve, reject) => {
      axios.get(`${PAGE_GET}?pageid=${pageId}`)
        .then(({data}) => {
          if (data && data.success && data.data) {
            resolve(data.data);
          } else {
            resolve({});
          }
        })
        .catch((err) => {
          // 重定向到500页
          resolve({});
        });
    });
  }
  componentDidMount () {
    const { updatePage, page, location } = this.props;
    const pageId = Number(location.query.id);
    !isNaN(pageId) && this.getPageData(pageId).then((res) => updatePage(res));
  }
  render () {
    const { updatePage, page } = this.props;
    const { author, categories, created, html, id, modified, tags = '', title } = page;
    !dangerHtml && html && (dangerHtml = html);
    return (
      <div>
        <Helmet title='Page' />
        <div className='page-wrapper md-base'>
          {/* <div className='page-list'>list</div>
          <div className='page-nav'>nav</div> */}
          <div className='page-center base-info'>
            <h3 className='page-title'>{title}</h3>
            <div className='page-tags'>
              <ul>
                {tags.split(',').map((tag, key) => <li key={key} className='tag-item'><span className="text" title={tag}>{tag}</span></li>)}
              </ul>
            </div>
            <div className='page-detail'>
              <span>{author}</span>
              <span>{created}</span>
            </div>
            <div className='page-content'>
            {
              <div
                className='md-base'
                dangerouslySetInnerHTML={{__html: dangerHtml}}
              />
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageView
