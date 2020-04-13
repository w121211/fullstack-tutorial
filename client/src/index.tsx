import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import gql from 'graphql-tag';

import Pages from './pages'
import { PageContainer } from './components'
// import Login from './pages/login'
import { resolvers, typeDefs } from './store/resolvers'
import Templates from './templates'
import './index.css'
import * as queries from './store/queries'

const cache = new InMemoryCache({
  dataIdFromObject: (o: any) => {
    switch (o.__typename) {
      case 'Like': {
        if (o.feedId) return `Like:Feed:${o.feedId}`
        else if (o.commentId) return `Like:Comment:${o.commentId}`
        else if (o.postId) return `Like:Post:${o.postId}`
        else if (o.pollId) return `Like:Poll:${o.pollId}`
        else return null
      }
      default: return defaultDataIdFromObject(o)
    }
  }
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'Space Explorer [web]',
      'client-version': '0.1',
    },
  }),
  resolvers,
  typeDefs,
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
    isClicked: false,
    myLikes: [{
      __typename: "Like",
      id: "id-id-id",
      feedId: "1234",
      postId: null,
      pollId: null,
      commentId: null,
      choice: 1,
      updatedAt: "12-12-2012",
    },
    {
      __typename: "Like",
      id: "id-id-id2",
      feedId: null,
      postId: null,
      pollId: null,
      commentId: "1234",
      choice: 1,
      updatedAt: "12-12-2012",
    }],
  },
})

function IsLoggedIn() {
  // const { data } = useQuery(IS_LOGGED_IN)
  // return data.isLoggedIn ? <Pages /> : <Login />
  return <Pages />
  // return <PageContainer />
}

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <IsLoggedIn /> */}
    <Templates />
  </ApolloProvider>,
  document.getElementById('root'),
)


