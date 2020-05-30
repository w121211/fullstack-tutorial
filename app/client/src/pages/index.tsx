import React, { Fragment } from 'react'
import { Router, RouteComponentProps, Redirect } from '@reach/router'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PageContainer, Pane } from '../components/layout'
import { Board, BoardRightPane } from './board'
import { SymbolPage } from './symbol'
import { PostCreate } from './postNew'
import { ProtectedRoute, Login, AutoLogin } from './login'


interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.FC<NotFoundProps> = () => {
  return <h1>Page not found</h1>
}

export function Pages() {
  const { data, loading, refetch } = useQuery<QT.me>(queries.ME)
  const isLoggedIn = !!data?.me

  if (loading) return null

  return (
    <>
      <AutoLogin />
      <Router primary={false} component={Fragment}>

        <PageContainer path="/" isLoggedIn={isLoggedIn}>
          {/* <Feed default /> */}

          <ProtectedRoute
            as={<Pane left={<PostCreate />} />}
            isLoggedIn={isLoggedIn}
            path="post/new"
          />

          <SymbolPage path="symbol/:name" />

          {/* <ProtectedRoute as={Feed} isLoggedIn={isLoggedIn} default /> */}
          <Pane left={<Board me={data?.me} />} right={<BoardRightPane />} default />
          {/* <Pane left={<Board me={data?.me} />} right={<BoardRightPane />} default /> */}

          <Login path="login" />

        </PageContainer>


        <NotFound default />

        {/* <Pane path="/" left={<Feeds />} right={undefined} /> */}



        {/* <EventPage path="event/:name" /> */}

        {/* <CommitCreate path="commit/new" /> */}
        {/* <Ticker path="ticker" /> */}
        {/* <Pane path="feeds" left={Feeds} right={Tracks} /> */}
        {/* <Feeds path="feeds" />

      {/* <Launches path="/" />
        <Launch path="launch/:launchId" />
        <Cart path="cart" />｀
        <Profile path="profile" /> */}
      </Router>
    </>

  )
}

