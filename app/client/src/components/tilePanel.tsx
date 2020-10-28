import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentLike, CommentDislike } from './tileLikes'

interface CommentPanelProps {
    comment: QT.comment
    // nReplies: number
    // showReplies: boolean
    // setShowReplies: (a: boolean) => void
    meCommented: boolean
}

export const CommentPanel: React.FC<CommentPanelProps> = ({ comment, meCommented }) => {
    const [count, setCount] = useState<QT.comment_count>(comment.count)
    const [createCommentLike] = useMutation<QT.createCommentLike, QT.createCommentLikeVariables>(
        queries.CREATE_COMMENT_LIKE, {
        update(cache, { data }) {
            const res = cache.readQuery<QT.myCommentLikes>({ query: queries.MY_COMMENT_LIKES, })
            if (data?.createCommentLike && res?.myCommentLikes) {
                cache.writeQuery<QT.myCommentLikes>({
                    query: queries.MY_COMMENT_LIKES,
                    data: { myCommentLikes: res?.myCommentLikes.concat([data?.createCommentLike.like]), },
                })
                setCount(data.createCommentLike.count)
            }
        },
    })
    const [updateCommentLike] = useMutation<QT.updateCommentLike, QT.updateCommentLikeVariables>(
        queries.UPDATE_COMMENT_LIKE, {
        update(cache, { data }) {
            const res = cache.readQuery<QT.myCommentLikes>({ query: queries.MY_COMMENT_LIKES, })
            if (data?.updateCommentLike && res?.myCommentLikes) {
                cache.writeQuery<QT.myCommentLikes>({
                    query: queries.MY_COMMENT_LIKES,
                    data: {
                        myCommentLikes: res.myCommentLikes.map((e) =>
                            e.commentId === data.updateCommentLike.like.commentId ? data.updateCommentLike.like : e
                        ),
                    },
                })
                setCount(data.updateCommentLike.count)
            }
        },
    })
    const myCommentLikes = useQuery<QT.myCommentLikes>(
        queries.MY_COMMENT_LIKES, { fetchPolicy: "cache-only" }
    )
    const meLike = myCommentLikes.data?.myCommentLikes.find(e => e.commentId === comment.id)

    return (
        <span>
            {meCommented ? "@me" : "@anonymous"}
            {/* <span>{dayjs(comment.createdAt).format("H:mm")}</span> */}
            <CommentLike {...{ commentId: comment.id, count, meLike, createCommentLike, updateCommentLike }} />
            <CommentDislike {...{ commentId: comment.id, count, meLike, createCommentLike, updateCommentLike }} />
            {/* <span
            key="comments"
            onClick={() => { setShowComments(!showComments) }}>
            <CoffeeOutlined />{commentCount}
            </span> */}
        </span>
    )
}

// interface PollFooterProps {
//   poll: QT.pollFragment
//   commentCount: number
//   showComments: boolean
//   setShowComments: (a: boolean) => void
//   mePolled: boolean
// }

// export const PollFooter: React.FC<PollFooterProps> = ({ poll, commentCount, showComments, setShowComments, mePolled }) => {
//   const [count, setCount] = useState<QT.pollFragment_count>(poll.count)
//   const [createPollLike] = useMutation<QT.createPollLike, QT.createPollLikeVariables>(
//     queries.BLOCK,
//     //   queries.CREATE_POLL_LIKE, {
//     //   update(cache, { data }) {
//     //     const res = cache.readQuery<QT.myPollLikes>({ query: queries.MY_POLL_LIKES })
//     //     if (data?.createPollLike && res?.myPollLikes) {
//     //       cache.writeQuery<QT.myPollLikes>({
//     //         query: queries.MY_POLL_LIKES,
//     //         data: { myPollLikes: res?.myPollLikes.concat([data?.createPollLike.like]), },
//     //       })
//     //       setCount(data.createPollLike.count)
//     //     }
//     //   },
//     // }
//   )
//   const [updatePollLike] = useMutation<QT.updatePollLike, QT.updatePollLikeVariables>(
//     queries.BLOCK,
//     //   queries.UPDATE_POST_LIKE, {
//     //   // refetchQueries: [],
//     //   update(cache, { data }) {
//     //     const res = cache.readQuery<QT.myPollLikes>({ query: queries.MY_POST_LIKES })
//     //     if (data?.updatePollLike && res?.myPollLikes) {
//     //       cache.writeQuery<QT.myPollLikes>({
//     //         query: queries.MY_POST_LIKES,
//     //         data: {
//     //           myPollLikes: res.myPollLikes.map((e) =>
//     //             e.pollId === data.updatePollLike.like.pollId ? data.updatePollLike.like : e,
//     //           ),
//     //         },
//     //       })
//     //       setCount(data.updatePollLike.count)
//     //     }
//     //   },
//     // }
//   )
//   const myPollLikes = useQuery<QT.myPollLikes>(
//     queries.BLOCK,
//     // queries.MY_POLL_LIKES, { fetchPolicy: "cache-only" }
//   )
//   const meLike = myPollLikes.data?.myPollLikes.find(e => e.pollId === poll.id)

//   return (
//     <div style={{ textAlign: "right" }}>
//       <small>
//         <Space>
//           <span>
//             {mePolled ? "@me" : "@anonymous"}
//           </span>
//           <span>{dayjs(poll.createdAt).format("H:mm")}</span>
//           <PollLike
//             key="comment-basic-like"
//             pollId={poll.id}
//             meLike={meLike}
//             createPollLike={createPollLike}
//             updatePollLike={updatePollLike}
//             count={count} />
//           <PollDislike
//             key="comment-basic-dislike"
//             pollId={poll.id}
//             meLike={meLike}
//             createPollLike={createPollLike}
//             updatePollLike={updatePollLike}
//             count={count} />
//           <span
//             key="comments"
//             onClick={() => { setShowComments(!showComments) }}>
//             <CoffeeOutlined />{commentCount}
//           </span>
//         </Space>
//       </small>
//     </div>
//   )
// }
