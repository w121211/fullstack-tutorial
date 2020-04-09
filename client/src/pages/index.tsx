import React, { Fragment } from 'react'
import { Router } from '@reach/router'

import Feeds from './Feeds'
import FeedCreate from './FeedCreate'
// import Launch from './launch'
// import Launches from './launches'
// import Cart from './cart'
// import Profile from './profile'
import { PageContainer, Pane } from '../components'

export default function Pages() {
  return (
    <>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Pane path="/" left={<Feeds />} right={undefined} />
          <FeedCreate path="feed/new" />
          {/* <Pane path="feeds" left={Feeds} right={Tracks} /> */}
          {/* <Feeds path="feeds" />
          <Feed path="feed/:id" /> */}

          {/* <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" /> */}
        </Router>
      </PageContainer>
    </>
  );
}
