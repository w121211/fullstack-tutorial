import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PostTile } from './Post'


interface Props {
  commit: QT.commitDetail
}



const fakeCommit = {
  symbolId: "!some-event-name",
  action: QT.CommitAction.CREATE,
  content: {
    symbolName: "!some-event-name",
    parent: [],  // event
    tickers: [],
    tags: [],
  }
}

export const CommitDetail: React.FC<Props> = ({ commit }) => {
  const [showResult, setShowResult] = useState(false)
  const [showCreateReview, setShowCreateReview] = useState(false)

  const { status, action, post, content } = commit

  const meReview = null
  const result = <p>*** agrees, *** disagrees</p>
  const toShowResult = () => setShowResult(true)

  let statusButton = null
  switch (status) {
    case QT.CommitStatus.PASS:
      statusButton = <button className="link-button" onClick={toShowResult}>Passed</button>
      break
    case QT.CommitStatus.REJECT:
      statusButton = <button className="link-button" onClick={toShowResult}>Rejected</button>
      break
    case QT.CommitStatus.REVIEW:
      statusButton = meReview
        ? <button className="link-button" onClick={toShowResult}>Under review</button>
        : <button className="link-button" onClick={() => setShowCreateReview(true)}>Under review</button>
      break
  }

  return (
    <>
      <p>{action} : {statusButton}</p>
      {result}
      {/* {showCreateReview ? <CommitReviewForm /> : null} */}
      <p>{content}</p>
      <PostTile post={post} toLogin={() => { }} />
    </>
  )
}
export default Event