import ArticleDetail from './components/ArticleDetail';
import ArticleList from './components/ArticleList';
import NotFound from './components/NotFound';

const routes = [
  {
    path: '/',
    component: ArticleList,
    exact: true,
  },
  {
    path: '/articles/:id',
    component: ArticleDetail,
    exact: false,
  },
  {
    path: '*',
    component: NotFound,
    exact: false,
  },
];

export default routes;
