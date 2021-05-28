import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { ARTICLES_ENDPOINT } from '../../constants/endpoint';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    axios
      .get(ARTICLES_ENDPOINT + id)
      .then(({ data }) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        throw err;
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
            <span>{article.createdAt.slice(0, 16).replace('T', ' ')}</span>
            <span>{article.minsRead} MINS READ</span>
          </div>
        </div>
      </div>
    );
  }

  const Loading = () => <h3 className="txt-center">Loading</h3>;

  const Empty = () => <h3 className="txt-center">Article is not found</h3>;

  useEffect(() => {
    fetchData();
  }, [id]);

  return <>{isLoading ? <Loading /> : article ? fillArticle() : <Empty />}</>;
};

export default ArticleDetail;
