import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

import Pages from './pages'
import { PageContainer } from './components'
// import Login from './pages/login'
import { resolvers, typeDefs } from './resolvers'
import Templates from './templates'
import './index.css'

// import Chart from './components/Chart'

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache()
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
  },
})

/**
 * Render our app
 * - We wrap the whole app with ApolloProvider, so any component in the app can
 *    make GraphqL requests. Our provider needs the client we created above,
 *    so we pass it as a prop
 * - We need a router, so we can navigate the app. We're using Reach router for this.
 *    The router chooses between which component to render, depending on the url path.
 *    ex: localhost:3000/login will render only the `Login` component
 */

function IsLoggedIn() {
  // const { data } = useQuery(IS_LOGGED_IN)
  // return data.isLoggedIn ? <Pages /> : <Login />
  // return <Pages />
  return <PageContainer />
}

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <IsLoggedIn /> */}
    <Templates />
  </ApolloProvider>,
  document.getElementById('root'),
)
