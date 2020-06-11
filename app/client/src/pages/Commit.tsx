import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'


interface Props extends RouteComponentProps {
  id: string
}

export const Commit: React.FC<Props> = ({ id }) => {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  // useQuery<QT.myCommitReiv
  const getMe = useQuery<QT.me>(queries.ME)
  const { data, loading, error } = useQuery<QT.commit, QT.commitVariables>(
    queries.LATEST_POSTS, { fetchPolicy: "cache-and-network" })
  const [showResult, setShowResult] = useState(false)
  const [showCreateReview, setShowCreateReview] = useState(false)

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return null

  const { status, action, post, content } = data.commit
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
      {/* <PostTile post={post} toLogin={() => { }} /> */}
    </>
  )
}
export default Event