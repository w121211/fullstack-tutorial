import React, { Fragment } from 'react'
import { Router } from '@reach/router'

import { Feed } from './Feed'
import { PageContainer, Pane } from '../components'
import { EventPage } from './Event'
import { CommitCreate } from './CommitCreate'
import { PostCreate } from './PostCreate'
import { Ticker } from './Ticker'


export default function Pages() {
  return (
    <>
      {/* <PageContainer> */}
      <Router primary={false} component={Fragment}>
        {/* <Pane path="/" left={<Feeds />} right={undefined} /> */}
        <Feed path="/" />
        <PostCreate path="post/new" />
        <EventPage path="event/:name" />
        <CommitCreate path="commit/new" />
        <Ticker path="ticker" />
        {/* <Pane path="feeds" left={Feeds} right={Tracks} /> */}
        {/* <Feeds path="feeds" />

        {/* <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" /> */}
      </Router>
      {/* </PageContainer> */}
    </>
  )
}
