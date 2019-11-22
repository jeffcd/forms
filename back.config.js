export default {
  router: {
    basename: '/'
  },
  routes: [
    {
      path: '/',
      exact: true,
      page: 'Home'
    }
  ],
  transports: {
    default: {
      type: 'http',
      opts: {
        base: '/api/'
      },
      endpoints: {
      }
    }
  }
}
