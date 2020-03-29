module.exports = {
  client: {
    name: 'Space Explorer [web]',
    // service: 'space-explorer',
    service: {
      name: 'my-service-name',
      url: 'http://localhost:4000/graphql',
    },
    excludes: ['**/node_modules', '**/__tests__/**/*', './_src/**/*']
  },
};
