import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../ArticleCard';
import { ENDPOINT } from '../../constants/endpoint';
import Loading from '../common/Loading';
import Empty from '../common/Empty';
import { loadData } from '../../hocs/loadData';

const PATH = 'articles';

export default function ArticleList() {
  const [articles, setArticles] = useState(null);

  const fillArticles = (articles: any) => {
    return articles.map((article: any) => <ArticleCard key={article.id} {...article} />);
  };

  useEffect(() => {
    axios
      .get(`${ENDPOINT}${PATH}`)
      .then(({ data }) => {
        setArticles(data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const ArticleListContainer = (props: any) => {
    return (
      <section className="articles-section">
        <ul className="list-group articles-group">{fillArticles(props.data)}</ul>
      </section>
    );
  };

  const LoadArticleList = loadData(ArticleListContainer);

  return <LoadArticleList data={articles} />;
}
