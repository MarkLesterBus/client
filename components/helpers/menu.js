export default [
  {
    header: 'ADMINISTRATOR',
    divider: true,
    menu: [
      {
        icon: 'mdi-speedometer',
        title: 'Dashboard',
        to: '/admin',
      },
      {
        icon: 'mdi-domain',
        title: 'Companies',
        to: '/admin/companies',
      },
      {
        icon: 'mdi-file-tree',
        title: 'Jobs',
        to: '/admin/jobs',
      },
      {
        icon: 'mdi-book-plus',
        title: 'Categories',
        to: '/admin/categories',
      },
      {
        icon: 'mdi-poll',
        title: 'Levels',
        to: '/admin/levels',
      },
    ],
  },
  {
    header: 'SETTINGS',
    divider: false,
    menu: [
      {
        icon: 'mdi-account-key',
        title: 'Users',
        to: '/admin/users',
      },
    ],
  },
]
