import React, { useState } from 'react'
import { Link } from '@reach/router'
import { useQuery, useMutation, } from '@apollo/client'
import { Card, Typography, Form, Button, Input, Space, List } from 'antd'

import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { CommentLike, CommentDislike } from './likes'

const N_COMMENTS_TAKEN = 20

// function CommentForm({ postId, toAddCommentCountByOne }: { postId: string, toAddCommentCountByOne: () => void }) {
//   const [form] = Form.useForm()
//   const [createComment] = useMutation<QT.createComment, QT.createCommentVariables>(
//     queries.CREATE_COMMENT, {
//     update(cache, { data }) {
//       const res = cache.readQuery<QT.comments, QT.commentsVariables>({
//         query: queries.COMMENTS,
//         variables: { postId },
//       })
//       if (data?.createComment && res?.comments) {
//         cache.writeQuery<QT.comments, QT.commentsVariables>({
//           query: queries.COMMENTS,
//           variables: { postId },
//           data: { comments: res?.comments.concat([data?.createComment]) },
//         })
//         toAddCommentCountByOne()
//         form.resetFields()
//       }
//     }
//   })

//   const onFinish = (values: any) => {
//     createComment({ variables: { postId, data: values } })
//   }
//   const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
//   }
//   return (
//     <Form
//       form={form}
//       name="comment-form"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       size="small"
//     // layout="inline"
//     // style={{ marginRight: 20 }}
//     >
//       <Form.Item
//         name="content"
//         rules={[{
//           required: true,
//           message: 'comment cannot be empty'
//         }]}
//       >
//         <Input placeholder="你的意見..." />
//       </Form.Item>

//       <Form.Item style={{ textAlign: "right" }}>
//         <Button type="primary" htmlType="submit">送出</Button>
//       </Form.Item>

//     </Form>
//   )
// }

// interface CommentFooterProps {
//   comment: QT.comment
//   meComment: boolean
// }

// const CommentFooter: React.FC<CommentFooterProps> = ({ comment, meComment }) => {
//   const [count, setCount] = useState<QT.comment_count>(comment.count)
//   const [createCommentLike] = useMutation<QT.createCommentLike, QT.createCommentLikeVariables>(
//     queries.CREATE_COMMENT_LIKE, {
//     update(cache, { data }) {
//       const res = cache.readQuery<QT.myCommentLikes>({ query: queries.MY_COMMENT_LIKES, })
//       if (data?.createCommentLike && res?.myCommentLikes) {
//         cache.writeQuery<QT.myCommentLikes>({
//           query: queries.MY_COMMENT_LIKES,
//           data: { myCommentLikes: res?.myCommentLikes.concat([data?.createCommentLike.like]), },
//         })
//         setCount(data.createCommentLike.count)
//       }
//     },
//   })
//   const [updateCommentLike] = useMutation<QT.updateCommentLike, QT.updateCommentLikeVariables>(
//     queries.UPDATE_COMMENT_LIKE, {
//     update(cache, { data }) {
//       const res = cache.readQuery<QT.myCommentLikes>({ query: queries.MY_COMMENT_LIKES, })
//       if (data?.updateCommentLike && res?.myCommentLikes) {
//         cache.writeQuery<QT.myCommentLikes>({
//           query: queries.MY_COMMENT_LIKES,
//           data: {
//             myCommentLikes: res.myCommentLikes.map((e) =>
//               e.commentId === data.updateCommentLike.like.commentId ? data.updateCommentLike.like : e
//             ),
//           },
//         })
//         setCount(data.updateCommentLike.count)
//       }
//     },
//   })
//   const myCommentLikes = useQuery<QT.myCommentLikes>(
//     queries.MY_COMMENT_LIKES, { fetchPolicy: "cache-only" }
//   )
//   const meLike = myCommentLikes.data?.myCommentLikes.find(e => e.commentId === comment.id)

//   return (
//     <Space style={{ textAlign: "right" }}>
//       <small>{meComment ? "@me" : "@anonymous"}</small>
//       <small>
//         <CommentLike {...{ commentId: comment.id, count, meLike, createCommentLike, updateCommentLike }} />
//       </small>
//       <small>
//         <CommentDislike {...{ commentId: comment.id, count, meLike, createCommentLike, updateCommentLike }} />
//       </small>
//     </Space>
//   )
// }

// interface CommentListProps extends QT.commentsVariables {
//   me?: QT.me_me
//   toAddCommentCountByOne: () => void
// }

// export const CommentList: React.FC<CommentListProps> = ({ me, postId, toAddCommentCountByOne }) => {
//   const { data, loading, error, refetch } = useQuery<QT.comments, QT.commentsVariables>(
//     queries.COMMENTS, { variables: { postId } }
//   )

//   const [hasMore, setHasMore] = useState<boolean>(false)

//   if (loading) return null
//   // if (error) return <p>ERROR: {error.message}</p>
//   if (!data) return null
//   if (data.comments.length === N_COMMENTS_TAKEN) setHasMore(true)

//   return (
//     <Card type="inner" bordered={false}>
//       <List
//         // bordered
//         size="small"
//         // split={false}
//         dataSource={data.comments}
//         // loadMore={hasMore ? <Button type="link">more</Button> : null}
//         renderItem={e => (
//           <List.Item>
//             <span>{e.content}</span>
//             <CommentFooter comment={e} meComment={me?.id === e.userId} />
//           </List.Item>
//         )}
//       />
//       <CommentForm postId={postId} toAddCommentCountByOne={toAddCommentCountByOne} />
//     </Card>
//   )
// }


// function Body({ pattern, setPattern }: { pattern: null | string, setPattern: (a: string | null) => void }) {
//   function setter(s: string) {
//     if (pattern !== null) {
//       setPattern(null)
//     }
//     else {
//       setPattern(s)
//     }
//   }
//   return (
//     <p>
//       <a onClick={e => { setter("a") }}>a</a>
//       <a onClick={e => { setter("b") }}>b</a>
//       <a onClick={e => { setter("c") }}>c</a>
//     </p>
//   )
// }

// function FilteredList({ comments, pattern }: { comments: string[], pattern: string | null }) {
//   const list = comments.map(e => {
//     if (pattern === null)
//       return <span>{e}, </span>
//     else if (e.indexOf(pattern) >= 0)
//       return <span>{e}</span>
//     return null
//   })
//   return <p>{list}</p>
// }


// export const TestCommentList: React.FC = () => {
//   // const { data, loading, error, refetch } = useQuery<QT.comments, QT.commentsVariables>(
//   //   queries.COMMENTS, { variables: { postId: "12345" } }
//   // )

//   // if (loading) return null
//   // // if (error) return <p>ERROR: {error.message}</p>
//   // if (!data) return null
//   // function toAddCommentCountByOne() { }

//   const comments = ["aaa", "bbb", "ccc"]
//   const [pattern, setPattern] = useState<string | null>(null)

//   return (
//     <>
//       <Body pattern={pattern} setPattern={setPattern} />
//       <FilteredList comments={comments} pattern={pattern} />
//     </>
//   )
// }

  // return (
  //   <Card type="inner">
  //     {/* <a onClick={(e) => {}}>AAA</a>
  //     <a>BBB</a> */}
  //     <List
  //       size="small"
  //       dataSource={data.comments}
  //       renderItem={e => (
  //         <List.Item>
  //           <span>{e.content}</span>
  //           {/* <span>{e}</span> */}
  //           {/* <CommentFooter comment={e} meComment={me?.id === e.userId} /> */}
  //         </List.Item>
  //       )}
  //     />
  //     <CommentForm postId={"12345"} toAddCommentCountByOne={toAddCommentCountByOne} />
  //   </Card>
  // )