module.exports = {
  client: {
    // name: 'Tusbane[web]',
    // service: 'space-explorer',
    service: {
      name: 'conote',
      url: 'http://localhost:4000/graphql',
    },
    excludes: ['**/node_modules', '**/__tests__/**/*', '**/__deprecated__/**/*'],
  },
}
