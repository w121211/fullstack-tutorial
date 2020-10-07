import { gql } from '@apollo/client'

// ----------------------------
// Fragment
// ----------------------------

export const VOTE = gql`
  fragment vote on Vote {
    __typename
    id
    pollId
    choiceIdx
  }
`

export const REPLY_COUNT = gql`
  fragment replyCount on ReplyCount {
    __typename
    id
    nViews
    nUps
    nDowns
    # updatedAt
  }
`

export const REPLY = gql`
  fragment reply on Reply {
    __typename
    id
    userId
    isSpot
    text
    updatedAt
    count { 
      ...replyCount
    }
  }
  ${REPLY_COUNT}
`

export const COMMENT_COUNT = gql`
  fragment commentCount on CommentCount {
    __typename
    id
    nViews
    nUps
    nDowns
    # updatedAt
  }
`

export const COMMENT = gql`
  fragment comment on Comment {
    __typename
    id
    userId
    isSpot
    text
    updatedAt
    count { 
      ...commentCount
    }
  }
  ${COMMENT_COUNT}
`

export const COMMENT_LIKE = gql`
  fragment commentLike on CommentLike {
    __typename
    id
    commentId
    choice
    updatedAt
  }
`

export const REPLY_LIKE = gql`
  fragment replyLike on ReplyLike {
    __typename
    id
    replyId
    choice
    updatedAt
  }
`

// ----------------------------
// Query
// ----------------------------

export const BLOCK = gql`
  query block($id: ID,  $path: String) {
    block(id: $id, path: $path) {
      __typename
      id
      tempalte
      props {
        name
        longName
        path
        symbol
        canComment
        canOpenAsPage
        # commentIntro
        # commentSymbols
      }
      # body
      propComments {
        # blocks {
        # }
        text
        # ticks: [Tick!]
        # table: [Int]
        # chart: [Int]
      }
      ...comment
    }
  }
  ${COMMENT}
`

export const COMMENTS = gql`
  query comments($blockId: ID!, $afterId: ID) {
    comments(blockId: $blockId, afterId: $afterId) {
      ...comment
    }
  }
  ${COMMENT}
`

export const REPLIES = gql`
  query replies($commentId: ID!, $afterId: ID) {
    replies(commentId: $commentId, afterId: $afterId) {
      ...reply
    }
  }
  ${REPLY}
`

export const MY_COMMENT_LIKES = gql`
  query myCommentLikes {
    myCommentLikes {
      ...commentLike
    }
  }
  ${COMMENT_LIKE}
`

export const MY_REPLY_LIKES = gql`
  query myReplyLikes {
    myReplyLikes {
      ...replyLike
    }
  }
  ${REPLY_LIKE}
`

export const MY_VOTES = gql`
  query myVotes {
    myVotes {
      ...vote
    }
  }
  ${VOTE}
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

export const ME = gql`
  query me {
    me {
      id
    }
  }
`

// ----------------------------
// mutation
// ----------------------------

export const CREATE_COMMENT = gql`
  mutation createComment($blockId: ID!, $data: CommentInput!) {
    createComment(blockId: $blockId,  data: $data) {
      ...comment
    }
  }
  ${COMMENT}
`

export const CREATE_REPLY = gql`
  mutation createReply($replyId: ID!, $data: ReplyInput!) {
    createReply(replyId: $replyId,  data: $data) {
      ...reply
    }
  }
  ${REPLY}
`

export const CREATE_VOTE = gql`
  mutation createVote($pollId: ID!, $choiceIdx: Int!) {
    createVote(pollId: $pollId, choiceIdx: $choiceIdx) {
      ...vote
    }
  }
  ${VOTE}
`


export const CREATE_COMMENT_LIKE = gql`
  mutation createCommentLike($commentId: ID!, $data: LikeInput!) {
    createCommentLike(commentId: $commentId, data: $data) {
      like {
        ...commentLike
      }
      count {
        ...commentCount
      }
    }
  }
  ${COMMENT_LIKE}
  ${COMMENT_COUNT}
`

export const UPDATE_COMMENT_LIKE = gql`
  mutation updateCommentLike($id: ID!, $data: LikeInput!) {
    updateCommentLike(id: $id, data: $data) {
      like {
        ...commentLike
      }
      count {
        ...commentCount
      }
    }
  }
  ${COMMENT_LIKE}
  ${COMMENT_COUNT}
`

// export const UPDATE_POLL_VOTE = gql`
//   mutation updatePostVote($postId: ID!, $data: PostVoteInput!) {
//     updatePostVote(postId: $postId, data: $data) {
//       ...postVote
//     }
//   }
//   ${POST_VOTE}
// `

// export const UPDATE_COMMENT = gql`
//   mutation updateComment($id: ID!, $data: CommentInput!) {
//     updateComment(id: $id, data: $data) {
//       ...comment
//     }
//   }
//   ${COMMENT}
// `

export const SINGUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`