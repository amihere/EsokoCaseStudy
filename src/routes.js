import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const UserProfile = React.lazy(() => import('./views/UserProfile'));
const Users = React.lazy(() => import('./views/Users/Users'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Users', component: Dashboard },
  { path: '/posts', name: 'Posts', component: UserProfile },

  { path: '/users', exact: true,  name: 'Users', component: Users },
];

export default routes;
