import React from 'react';

// aplikasi
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const JenisParkir = React.lazy(() => import('./views/JenisParkir'));
const JenisKendaraan = React.lazy(() => import('./views/JenisKendaraan'));
const Customer = React.lazy(() => import('./views/Customer'));
const MemberAdmin = React.lazy(() => import('./views/MemberAdmin'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // aplikasi
  { path: '/pengaturan/jenis-kendaraan', exact: true, name: 'Jenis Kendaraan', component: JenisKendaraan },
  { path: '/pengaturan/jenis-parkir', exact: true, name: 'Jenis Parkir', component: JenisParkir },
  { path: '/pengaturan/member-admin', exact: true, name: 'Member Admin', component: MemberAdmin },
  { path: '/customer', exact: true, name: 'Kustomer', component: Customer }
];

export default routes;
