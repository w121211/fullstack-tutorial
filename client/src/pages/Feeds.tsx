import React, { useState } from 'react';
import { Link } from '@reach/router'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client'
import { Input, Card, Divider, Typography, Tag, Button, Form } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'

import { GET_FEEDS, GET_COMMENTS, CREATE_COMMENT, MY_LIKES } from '../store/query'
// import * as FeedDetailTypes from '../store/__generated__/FeedDetail'
import * as GetFeedsTypes from '../store/__generated__/GetFeeds'
import * as GetCommentsTypes from '../store/__generated__/GetComments'
import * as CreateCommentTypes from '../store/__generated__/CreateComment'
import * as CreateLikeTypes from '../store/__generated__/CreateLike'
import * as UpdateLikeTypes from '../store/__generated__/UpdateLike'
import * as MyLikesTypes from '../store/__generated__/MyLikes'

interface LikeProps {
  objType: string
  objId: string
  myLikes: MyLikesTypes.MyLikes
}

// const CreateLike: React.FC<LikeProps> = ({ objType, objId, myLikes }) => {
//   objType = "Feed"
//   objId = "1234"



//   const [createLike, { loading, error }] = useMutation<CreateLikeTypes.CreateLike, CreateLikeTypes.CreateLikeVariables>(
//     CREATE_COMMENT,
//     {
//       update(cache, { data }) {
//         const res = cache.readQuery<GetCommentsTypes.GetComments, GetCommentsTypes.GetCommentsVariables>({
//           query: GET_COMMENTS,
//           variables: { feedId, after },
//         })
//         if (data && data.createComment) {
//           cache.writeQuery({
//             query: GET_COMMENTS,
//             variables: { feedId, after },
//             data: { comments: res?.comments.concat([data.createComment]) }
//             // data: { comments: comments.concat([comment]) },
//             // data: { comments: [{ __typename: "Comment", id: "123", body: "hahahaha" }] },
//           })
//         }
//       }
//     }
//   )

// if (loading) return <p>Loading</p>
// if (error) return <p>An error occurred</p>
// return meLiked ? <a><b>liked</b></a> : <a>like</a>

// return meLiked ? 
// (
//   <>
//   *** 
//   </>
// )
// }

function MyLikes() {
  const { data, loading, error } = useQuery<MyLikesTypes.MyLikes>(
    MY_LIKES, {
    // skip: isHidden
    onCompleted(res) {
      console.log('fetched myLikes')
      console.log(res)
    }
  })
  return null
}

type FormData = {
  id: string
  body: string
}

interface CreateCommentFormProps {
  createComment: (a: { variables: CreateCommentTypes.CreateCommentVariables }) => void
  disabled: boolean
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ createComment, disabled }) => {
  const { register, handleSubmit, setValue, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(({ id, body }) => {
    console.log('submit...')
    console.log({ id, body })
    createComment({
      variables: { data: { body } }
    })
  })
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="body">body</label>
      <input name="body" placeholder="body..." defaultValue="this is a body" ref={register} />
      <button type="submit" disabled={disabled}>Submit</button>
    </form>
  )
}


interface CommentsProps extends GetCommentsTypes.GetCommentsVariables {
  isHidden: boolean
}

const CreateComment: React.FC<CommentsProps> = ({ feedId, after, isHidden }) => {
  const [createComment, { loading, error }] = useMutation<CreateCommentTypes.CreateComment, CreateCommentTypes.CreateCommentVariables>(
    CREATE_COMMENT,
    {
      update(cache, { data }) {
        const res = cache.readQuery<GetCommentsTypes.GetComments, GetCommentsTypes.GetCommentsVariables>({
          query: GET_COMMENTS,
          variables: { feedId, after },
        })
        if (data && data.createComment) {
          cache.writeQuery({
            query: GET_COMMENTS,
            variables: { feedId, after },
            data: { comments: res?.comments.concat([data.createComment]) }
            // data: { comments: comments.concat([comment]) },
            // data: { comments: [{ __typename: "Comment", id: "123", body: "hahahaha" }] },
          })
        }
      }
    }
    // {
    //   onCompleted({ login }) {
    //     localStorage.setItem('token', login as string);
    //     client.writeData({ data: { isLoggedIn: true } });
    //   }
    // }
  )


  // if (loading) return <p>Loading</p>
  if (error) return <p>An error occurred</p>
  return <CreateCommentForm createComment={createComment} disabled={loading} />;
}

const Comments: React.FC<CommentsProps> = ({ feedId, after, isHidden }) => {
  const client: ApolloClient<any> = useApolloClient();

  const { data, loading, error } = useQuery<GetCommentsTypes.GetComments, GetCommentsTypes.GetCommentsVariables>(
    GET_COMMENTS, {
    variables: { feedId, after },
    // skip: isHidden
  })

  if (isHidden) return null
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>No data</p>
  return (
    <>
      <CreateComment feedId={feedId} after={after} isHidden={isHidden} />
      <ul>
        {data.comments.map((c) =>
          <li key={c.id}>
            {c.body} <br />
            <p>xx <a>votes</a></p>
          </li>
        )}
      </ul>
      {/* <CommentForm createComment={null} /> */}
    </>
  )
}

interface FeedProps {
  feed: GetFeedsTypes.GetFeeds_feeds
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
  const { id, header, body, tags, tickers, stats } = feed
  const [isHidden, setIsHidden] = useState<boolean>(true)

  return (
    <Card size="small">
      <a>
        <b>{header}</b>
      </a>
      <br />
      {tags?.map((t) =>
        <Link key={t.id} to={`/tag/${t.id}`}>
          {t.name};
        </Link>
      )}
      <br />
      <p>
        __updatedAt__ __Source.com__ |
        <a onClick={() =>
          setIsHidden(!isHidden)} >
          {stats.nComments} Comments
        </a>
      </p>
      {/* {!isHidden && <Comments feedId={id} isHidden={isHidden} />} */}
      {<Comments feedId={id} isHidden={false} />}
    </Card>
  )
}



export default function Feeds() {
  const after = null
  const { data, loading, error } = useQuery<GetFeedsTypes.GetFeeds, GetFeedsTypes.GetFeedsVariables>(
    GET_FEEDS,
    { variables: { after } }
  )


  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data) return <p>No feeds</p>
  return (
    <>
      <MyLikes />
      <p>
        <Button type="primary" size="large">Post Feed</Button>
      </p>
      <p>
        Feeds | <a>Invited reviews (3+)</a>
      </p>
      {data.feeds && data.feeds.map((f) => <Feed key={f.id} feed={f} />)}
    </>
  )
  return (
    <>
      <p>
        <Button type="primary" size="large">Post Feed</Button>
      </p>
      <p>
        Feeds | <a>Invited reviews (3+)</a>
      </p>
      <Card size="small">
        <a>
          <Typography.Text strong>
            Ant Design, a design language for background applications, is refined by Ant UED Team
                </Typography.Text>
        </a>
        <br />
        <Tag>event-aaa-bbb</Tag>
        <Tag>$ABC</Tag>
        <Tag>$OPQ</Tag>
        <br />
        <Typography.Text type="secondary">17:32 Source.com | 12 Comments</Typography.Text>
      </Card>
      <p />
      <Card size="small">
        <a>
          <Typography.Text strong>
            Ant Design, a design language for background applications, is refined by Ant UED Team
                </Typography.Text>
        </a>
        <Tag>event-aaa-bbb</Tag>
        <Tag>$ABC</Tag>
        <Tag>$OPQ</Tag>
        <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
        <Button shape="circle" icon={<UpOutlined />} />
        <Button shape="circle" icon={<DownOutlined />} />
        <Divider />
        <Typography.Text underline>Comments [打開後才顯示]</Typography.Text>
        <ul>
          <li>Dictum non consectetur a erat nam at lectus urna.
                    <br />
            <a>upvote</a>
          </li>
          <li>Dolor purus non enim praesent elementum facilisis leo.
                    <br />
            <a>upvote</a>
          </li>
          <li>Vel pretium lectus quam id leo in vitae turpis <a>edit</a>
            <br />
                    30 ups
                  </li>
        </ul>
        <a>23 more</a>
        <Input
          placeholder="Your comment"
          style={{ width: 200 }}
        />
        <Button>SUBMIT</Button>

      </Card>
      <p />
      <Card size="small">
        <a>
          <Typography.Title level={4}>
            Trending / Signals [像寶箱一樣需要開啟]
                  </Typography.Title>
        </a>
      </Card>
      <p />
      <Card size="small">
        <a>
          <Typography.Title level={4}>
            Ant Design, a design language for background applications, is refined by Ant UED Team
                  </Typography.Title>
        </a>
        <Tag>event-aaa-bbb</Tag>
        <Tag>$ABC</Tag>
        <Tag>$OPQ</Tag>
        <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
      </Card>
      <p />

      <Divider>Below have been reached</Divider>

      <Card size="small">
        <a>
          <Typography.Title level={4}>
            Ant Design, a design language for background applications, is refined by Ant UED Team
                  </Typography.Title>
        </a>
        <Tag>event-aaa-bbb</Tag>
        <Tag>$ABC</Tag>
        <Tag>$OPQ</Tag>
        <Typography.Text type="secondary">17:32 Source.com</Typography.Text>
      </Card>
      <p />
      <Button>loading more</Button>
    </>
  )
}