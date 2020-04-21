module.exports = {
  client: {
    name: 'Tusbane[web]',
    // service: 'space-explorer',
    service: {
      name: 'tsubane',
      url: 'http://localhost:4000/graphql',
    },
    excludes: ['**/node_modules', '**/__tests__/**/*'],
  },
}
