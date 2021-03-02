module.exports = {
  client: {
    service: {
      name: 'Conote[web]',
      url: 'http://localhost:4000/graphql',
    },
    excludes: ['**/node_modules', '**/__tests__/**/*', '**/__deprecated__/**/*'],
  },
};
