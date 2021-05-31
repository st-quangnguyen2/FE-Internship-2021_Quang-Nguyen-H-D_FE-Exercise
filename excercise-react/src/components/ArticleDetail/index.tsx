import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { ENDPOINT } from '../../constants/endpoint';
import { formatDateTime } from '../../utils/dateTime';
import Loading from '../common/Loading';
import Empty from '../common/Empty';

const PATH = 'articles';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    axios
      .get(`${ENDPOINT}${PATH}/${id}`)
      .then(({ data }) => {
        setArticle(data);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fillArticle() {
    return (
      <div className="article">
        <div className="img-wrapper">
          <img src={article.image} alt="article image" className="img" />
        </div>
        <div className="body">
          <div className="header">
            <span className="category tag">{article.category}</span>
            <h4 className="title">{article.title}</h4>
          </div>
          <p className="desc">{article.desc}</p>
          <div className="footer">
            <span className="auhtor">
              BY: <strong>{article.author}</strong>
            </span>
            <span>{formatDateTime(article.createdAt)}</span>
            <span>{article.minsRead} MINS READ</span>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return <>{isLoading ? <Loading /> : article ? fillArticle() : <Empty />}</>;
};

export default ArticleDetail;
