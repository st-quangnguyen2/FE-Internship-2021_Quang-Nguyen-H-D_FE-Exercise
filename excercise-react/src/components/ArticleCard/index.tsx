import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateTime';
import IPropsArticle from '../../models/props/IPropsArticle';

const ArticleCard = (props: IPropsArticle) => {
  return (
    <li className="list-item articles-item">
      <div className="article-card">
        <div className="img-wrapper">
          <Link to={`/articles/${props.id}`}>
            <img src={props.image} alt="article image" className="img" />
          </Link>
        </div>
        <div className="body">
          <div className="header">
            <span className="category tag">{props.category}</span>
            <Link to={`/articles/${props.id}`}>
              <h4 className="title">{props.title}</h4>
            </Link>
          </div>
          <p className="desc">{props.desc}</p>
          <div className="footer">
            <span className="auhtor">
              BY: <strong>{props.author}</strong>
            </span>
            <span>{formatDateTime(props.createdAt)}</span>
            <span>{props.minsRead} MINS READ</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;
