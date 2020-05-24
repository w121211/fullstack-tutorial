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

import { Router } from '@reach/router'
import Pages from './pages'
// import Login from './pages/login'
import { resolvers, typeDefs } from './store/resolvers'
import Templates from './templates'
import './index.css'
import * as queries from './store/queries'
import * as QT from './store/queryTypes'

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
    // uri: 'http://localhost:4000',
    headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'Tsubane[web]',
      'client-version': '0.1',
    },
    credentials: 'include',
  }),
  resolvers,
  typeDefs,
})

cache.writeData({
  data: {
    // me: null,
    // isLoggedIn: !!localStorage.getItem('token'),
    // isLoggedIn: false,
    cartItems: [],
    isClicked: false,
    // myPostLikes: [],
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

function IsLoggedIn(props: any) {
  // useQuery<QT.me>(queries.ME)
  // useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  // useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  const { data } = useQuery(queries.ME, {
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (err) => {
      // console.error(err)
      // cache.writeData({ data: { isLoggedIn: false } })
    },
    // errorPolicy: 'all',
  })

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
  return <>{props.children}</>
}

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <Router>
      <SignupForm path="/" />
      <LoginForm path="/login" />
    </Router> */}
    {/* <Parent /> */}
    {/* <PostLike postId={"12345"}  /> */}

    {/* <IsLoggedIn> */}
    {/* <PostLike postId={"1"} meLike={null} /> */}
    {/* </IsLoggedIn> */}

    {/* <Templates /> */}
    {/* <PostCreate /> */}
    {/* <Feed /> */}
    <Pages />
  </ApolloProvider>,
  document.getElementById('root'),
)
