import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../ArticleCard';
import { ENDPOINT } from '../../constants/endpoint';

const PATH = 'articles';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fillArticles() {
    return articles.map((article) => <ArticleCard key={article.id} {...article} />);
  }

  const Loading = () => <h3 className="txt-center">Loading...</h3>;

  const Empty = () => <h3 className="txt-center">Articles is empty</h3>;

  useEffect(() => {
    axios
      .get(`${ENDPOINT}${PATH}`)
      .then(({ data }) => {
        setArticles(data);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
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
