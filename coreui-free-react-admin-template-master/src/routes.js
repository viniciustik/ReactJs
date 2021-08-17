import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Files = React.lazy(() => import('./views/Registrations/File'));
const Client = React.lazy(() => import('./views/Registrations/Client'));
const Prospect = React.lazy(() => import('./views/Registrations/Prospect'));
const Salesman = React.lazy(() => import('./views/Registrations/Salesman'));
const Service = React.lazy(() => import('./views/Registrations/Service'));
const Product = React.lazy(() => import('./views/Registrations/Product'));
const Company = React.lazy(() => import('./views/Registrations/Company'));
const Sale = React.lazy(() => import('./views/Moves/Sale'));
const Commission = React.lazy(() => import('./views/Moves/Commission'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'login' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/register/file', name: 'Arquivos', component: Files },
  { path: '/register/client', name: 'Client', component: Client },
  { path: '/register/prospect', name: 'Prospect', component: Prospect },
  { path: '/register/salesman', name: 'Salesman', component: Salesman },
  { path: '/register/service', name: 'Service', component: Service },
  { path: '/register/product', name: 'Product', component: Product },
  { path: '/register/company', name: 'Company', component: Company },
  { path: '/moves/sales', name: 'Sale', component: Sale },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
