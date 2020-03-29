import React, { Fragment } from 'react'
import { Router } from '@reach/router'

import FeedCreate from './FeedCreate'
import Feed from './Feed'
import Feeds from './Feeds'
// import Launch from './launch'
// import Launches from './launches'
// import Cart from './cart'
// import Profile from './profile'
import { Footer, PageContainer } from '../components'

export default function Pages() {
  return (
    <>
      {/* <PageContainer> */}
      <Router primary={false} component={Fragment}>
        <Feeds path="feeds" />
        <FeedCreate path="feed/new" />
        <Feed path="feed/:id" />

        {/* <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" /> */}
      </Router>
      {/* </PageContainer> */}
      {/* <Footer /> */}
    </>
  );
}
