import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link } from '@reach/router'
import { Space } from 'antd'
import { CoffeeOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { PostLike, PostDislike, PollLike, PollDislike } from './likes'

// interface PostFooterProps {
//   post: QT.post_post
//   commentCount: number
//   showComments: boolean
//   setShowComments: (a: boolean) => void
//   mePosted: boolean
// }

// export const PostFooter: React.FC<PostFooterProps> = ({ post, commentCount, showComments, setShowComments, mePosted }) => {
//   const [count, setCount] = useState<QT.post_post_count>(post.count)
//   const [createPostLike] = useMutation<QT.createPostLike, QT.createPostLikeVariables>(
//     queries.BLOCK,
//     //   queries.CREATE_POST_LIKE, {
//     //   update(cache, { data }) {
//     //     const res = cache.readQuery<QT.myPostLikes>({ query: queries.MY_POST_LIKES })
//     //     if (data?.createPostLike && res?.myPostLikes) {
//     //       cache.writeQuery<QT.myPostLikes>({
//     //         query: queries.MY_POST_LIKES,
//     //         data: { myPostLikes: res?.myPostLikes.concat([data?.createPostLike.like]), },
//     //       })
//     //       setCount(data.createPostLike.count)
//     //     }
//     //   },
//     // }
//   )
//   const [updatePostLike] = useMutation<QT.updatePostLike, QT.updatePostLikeVariables>(
//     queries.BLOCK,
//     //   queries.UPDATE_POST_LIKE, {
//     //   // refetchQueries: [],
//     //   update(cache, { data }) {
//     //     const res = cache.readQuery<QT.myPostLikes>({ query: queries.MY_POST_LIKES })
//     //     if (data?.updatePostLike && res?.myPostLikes) {
//     //       cache.writeQuery<QT.myPostLikes>({
//     //         query: queries.MY_POST_LIKES,
//     //         data: {
//     //           myPostLikes: res.myPostLikes.map((e) =>
//     //             e.postId === data.updatePostLike.like.postId ? data.updatePostLike.like : e,
//     //           ),
//     //         },
//     //       })
//     //       setCount(data.updatePostLike.count)
//     //     }
//     //   },
//     // }
//   )
//   const myPostLikes = useQuery<QT.myPostLikes>(
//     queries.BLOCK,
//     // queries.MY_POST_LIKES, { fetchPolicy: "cache-only" }
//   )
//   const meLike = myPostLikes.data?.myPostLikes.find(d => d.postId === post.id)

//   return (
//     <div style={{ textAlign: "right" }}>
//       <small>
//         <Space>
//           <span>
//             {mePosted ? "@me" : "@anonymous"}
//           </span>
//           <span>{dayjs(post.createdAt).format("H:mm")}</span>
//           {/* <span>10:27</span> */}
//           <PostLike
//             key="comment-basic-like"
//             postId={post.id}
//             meLike={meLike}
//             createPostLike={createPostLike}
//             updatePostLike={updatePostLike}
//             count={count} />
//           <PostDislike
//             key="comment-basic-dislike"
//             postId={post.id}
//             meLike={meLike}
//             createPostLike={createPostLike}
//             updatePostLike={updatePostLike}
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
