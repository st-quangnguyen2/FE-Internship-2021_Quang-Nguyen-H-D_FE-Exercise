import React from 'react'
import './style.scss';
import INews from '../../types/INews';

const News = (props: INews) => {
  return (
    <li className="list-item news-item">
      <div className="news">
        <div className="news-img-wrapper">
          <img src={props.image} alt="news image" className="news-img" />
        </div>
        <div className="news-body"> 
          <div className="news-header">
            <span className="news-category tag">{props.category}</span>
            <h4 className="news-title">{props.title}</h4>
          </div>
          <p className="news-desc">{props.desc}</p>
          <div className="news-footer">
            <span className="news-auhtor">BY: <strong>{props.author}</strong></span>
            <span>{props.createdAt.slice(0, 16).replace('T', ' ')}</span>
            <span>{props.minsRead} MINS READ</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default News;
