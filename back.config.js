export default {
  router: {
    basename: '/'
  },
  routes: [
    {
      path: '/',
      exact: true,
      page: 'Home'
    },
    {
      path: '/list',
      exact: true,
      page: 'List'
    }
  ],
  transports: {
    default: {
      type: 'http',
      opts: {
        base: '/api/'
      },
      endpoints: {}
    }
  }
}
