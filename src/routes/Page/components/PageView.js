import React from 'react'
import Helmet from 'react-helmet'
import './PageView.scss'

let dangerHtml = '';

export const PageView = (data) => {
  console.log(data);
  const { author, categories, created, html, id, modified, tags, title } = data.page;
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
};

export default PageView
