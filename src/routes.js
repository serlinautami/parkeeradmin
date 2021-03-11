import React from 'react';

// aplikasi
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const JenisParkir = React.lazy(() => import('./views/JenisParkir'));
const Customer = React.lazy(() => import('./views/Customer'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // aplikasi
  { path: '/pengaturan/jenis-parkir', exact: true, name: 'Jenis Parkir', component: JenisParkir },
  { path: '/customer', exact: true, name: 'Kustomer', component: Customer }
];

export default routes;
