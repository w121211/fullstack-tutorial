import React, { Fragment } from 'react'
import { Router } from '@reach/router'
import { Feeds } from './Feeds'
import { Event } from './Event'
import { Ticker } from './Ticker'
import { FeedCreate } from './UrlToFeed'
import { TrackingEvents } from './TrackingEvents'
import { CommitEvent } from './CommitEvent'
import { CommitEventReview } from './CommitEventReview'
import { Post } from './Post'
import { Me } from './Me'

export default function Templates() {
  return (
    <Router primary={false} component={Fragment}>
      <Feeds path="/" />
      <FeedCreate path="submit" />
      {/* <Post path="post" /> */}
      <Event path="event" />
      <Ticker path="ticker" />
      <TrackingEvents path="tracking/events" />
      <CommitEvent path="commit/event" />
      <CommitEventReview path="review/event" />
      <Me path="me" />
    </Router>
  );
}
