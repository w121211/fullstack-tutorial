import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

const postContent = {
  text: `if it is a link-post, then here can be some thought,
  or it can be a post-post, and http://aaa.com, #tag, $AAA, !event will auto recognize
  if it is a commit-post/poll-post, here is words describe the commit/poll
  here should allow author to add some [image]s, put this feature on the list
  `,
  poll: {
    start: "2000-01-01",  // 不准變更
    end: "2000-01-10", // 不准變更
    choices: ["choice a", "choice b", "choice c"], // 不准變更
    status: "",
    // _start: "2000-01-01",
    // _end: "2000-01-10",
    // _result: {},
  },
  link: {
    urL: "http://url.com",
    domain: "some domain",
    publishedAt: "2001-01-01 03:50",
  }
}

interface PostPollProps {
  me?: QT.me_me
  toLogin: () => void
  postId: string
  poll: QT.post_post_contentPoll
  count: QT.post_post_count
}

export const PostPoll: React.FC<PostPollProps> = ({ postId, poll, count, me, toLogin }) => {
  const [createPostVote] = useMutation<QT.createPostVote, QT.createPostVoteVariables>(
    queries.CREATE_POST_VOTE, {
    update(cache, { data }) {
      const res = cache.readQuery<QT.myPostVotes>({
        query: queries.MY_POST_VOTES,
      })
      if (data?.createPostVote && res?.myPostVotes) {
        // const fake = { ...data?.createPostLike, postId, choice: 1 }
        cache.writeQuery<QT.myPostVotes>({
          query: queries.MY_POST_VOTES,
          data: {
            myPostVotes: res?.myPostVotes.concat([data?.createPostVote]),
            // myPostLikes: res?.myPostLikes.concat([fake]),
          },
        })
      }
    },
  })
  const { data } = useQuery<QT.myPostVotes>(
    queries.MY_POST_VOTES, {
    fetchPolicy: "cache-only"
  })
  const meVote = data?.myPostVotes.find((x) => x.postId === postId)
  const [showResult, setShowResult] = useState(false)

  function choice(i: number, text: string, count: number) {
    // return <button key={i} onClick={toLogin}>{text}</button>
    if (!me) return <button key={i} onClick={toLogin}>{text}</button>
    if (meVote?.choice === i) return <b>[voted] {text}</b>
    // if (meVote || "ARCHIVED") return <p>{text}</p>
    return (
      <button key={i} onClick={
        () => createPostVote({ variables: { postId, data: { choice: i } } })
      }>
        {text}
      </button>
    )
  }

  return (
    <>
      {/* {meVote || "ARCHIVED" ? <button onClick={() => setShowResult(!showResult)}>result</button> : null} */}
      {poll.choices.map((x, i) => choice(i, x, 0))}
    </>
  )
}