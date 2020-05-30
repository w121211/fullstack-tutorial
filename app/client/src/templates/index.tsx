import React, { Fragment } from 'react'
import { Router } from '@reach/router'
import { Board } from './Board2'
import { Event } from './Event'
import { Ticker } from './Ticker'
import { FeedCreate } from './UrlToFeed'
import { TrackingEvents } from './TrackingEvents'
import { CommitEvent } from './CommitEvent'
import { CommitEventReview } from './CommitEventReview'
import { Post } from './Post'
import { Me } from './Me'
import { Pane, PageContainer } from './Container'
import { Signup } from './Signup'

export default function Templates() {
  const signup = <Signup />
  const post = <Post />
  const form = <FeedCreate />

  return (
    <PageContainer>
      <Router primary={false} component={Fragment}>
        <Pane path="/" left={post} right={null} />
        {/* <Container></Container> */}
        {/* <Container path="/" /> */}
        {/* <Login path="login/" /> */}
        <Board path="board" />
        <Pane path="form" left={form} right={null} />
        {/* <Post path="post" /> */}
        <Event path="event" />
        <Ticker path="ticker" />
        <TrackingEvents path="tracking/events" />
        <CommitEvent path="commit/event" />
        <CommitEventReview path="review/event" />
        <Me path="me" />
        <Signup path="signup" />
      </Router>
    </PageContainer>
  )
}
