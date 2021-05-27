import React, {useState, useEffect} from 'react';
import News from './components/News/index';
import './App.scss';
import INews from './types/INews';
import axios from 'axios';

export default function App() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('https://6088e20da6f4a300174271e7.mockapi.io/articles').then(({data}) => {
      setNews(data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);
  return (
    <section className="news-section">
      <ul className="list-group news-group">
        {news.map((item, index)=> <News key={index} {...item}/>)}
      </ul>
    </section>
  );
}
