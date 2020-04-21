import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  NormalizedCacheObject,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Pages from './pages'
import { PageContainer } from './components'
// import Login from './pages/login'
import { resolvers, typeDefs } from './store/resolvers'
import Templates from './templates'
import './index.css'
import * as queries from './store/queries'
import { Post } from './components/Post'

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
      default:
        return defaultDataIdFromObject(o)
    }
  },
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'Tsubane[web]',
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
    myLikes: [
      {
        __typename: 'Like',
        id: 'id-id-id',
        feedId: '1234',
        postId: null,
        pollId: null,
        commentId: null,
        choice: 1,
        updatedAt: '12-12-2012',
      },
      {
        __typename: 'Like',
        id: 'id-id-id2',
        feedId: null,
        postId: null,
        pollId: null,
        commentId: '1234',
        choice: 1,
        updatedAt: '12-12-2012',
      },
    ],
  },
})

async function IsLoggedIn() {
  const { data } = await useQuery(queries.GET_ME, {
    onCompleted: (res) => {
      console.log(res)
    },
  })
  console.log(data)

  // const { data: data2 } = useQuery(queries.COMMENTS, {
  //   variables: {
  //     postId: 'asjoidj',
  //   },
  //   onCompleted: (res) => {
  //     console.log('queries')
  //     console.log(res)
  //   },
  //   errorPolicy: 'all',
  // })
  // const { data } = useQuery(IS_LOGGED_IN)
  // return data.isLoggedIn ? <Pages /> : <Login />
  // return <Pages />
  // return <PageContainer />
}

IsLoggedIn()

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <IsLoggedIn /> */}
    {/* <Templates /> */}
    {/* <Post /> */}
  </ApolloProvider>,
  document.getElementById('root'),
)
