import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../ArticleCard';
import { ARTICLES_ENDPOINT } from '../../constants/endpoint';
import { H3 } from 'native-base';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fillArticles() {
    return articles.map((article, index) => <ArticleCard key={index} {...article} />);
  }

  const Loading = () => <h3 className="txt-center">Loading</h3>;

  const Empty = () => <h3 className="txt-center">Articles is empty</h3>;

  useEffect(() => {
    axios
      .get(ARTICLES_ENDPOINT)
      .then(({ data }) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <section className="articles-section">
      <ul className="list-group articles-group">
        {isLoading ? <Loading /> : articles.length ? fillArticles() : <Empty />}
      </ul>
    </section>
  );
}
