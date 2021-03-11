export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Customer',
      url: '/customer',
      icon: 'icon-people',
    },
    {
      name: 'Parkir',
      url: '/parkir',
      icon: 'icon-directions',
    },
    {
      name: 'Laporan',
      url: '/laporan',
      icon: 'icon-chart',
    },
    {
      name: 'Pengaturan',
      url: '/pengaturan',
      icon: 'icon-settings',
      children: [
        {
          name: 'Member Admin',
          url: '/pengaturan/member-admin',
        },
        {
          name: 'Jenis Parkir',
          url: '/pengaturan/jenis-parkir',
        },
      ]
    }
  ],
};
