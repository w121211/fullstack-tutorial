import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'

import { typeDefs } from './store/resolvers'
import { cache } from './cache'
import { Pages } from './pages'
import { MdText } from './components/markdown'
// import AppLayout from './appLayout/appLayout'
import './index.less'


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  headers: {
    // authorization: localStorage.getItem('token') || '',
    'client-name': 'Tsubane[web]',
    'client-version': '0.1.0',
  },
  // TODO: 需設為'include'，否則cookies不會被儲存（不確定正式時是否需要）
  // Ref 1: https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
  // Ref 2: https://github.com/apollographql/apollo-client/issues/4190
  credentials: 'include',
  // credentials: "same-origin",
  resolvers: {},
  // resolvers,
  typeDefs,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <SyntaxText /> */}
    <Pages />
    {/* <TestCommentList /> */}
    {/* <DemoPages /> */}
    {/* <AppLayout /> */}
  </ApolloProvider>,
  document.getElementById('root'),
)
