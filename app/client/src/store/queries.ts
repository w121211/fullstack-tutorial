import { gql } from '@apollo/client'

// ----------------------------
// Fragment
// ----------------------------

const VOTE = gql`
  fragment vote on Vote {
    __typename
    id
    pollId
    choiceIdx
  }
`

const POLL = gql`
  fragment poll on Poll {
    __typename
    id
    commentId
    choices
    nVotes
    createdAt
  }
`

const REPLY_COUNT = gql`
  fragment replyCount on ReplyCount {
    __typename
    id
    nViews
    nUps
    nDowns
    # updatedAt
  }
`

const COMMENT_COUNT = gql`
  fragment commentCount on CommentCount {
    __typename
    id
    nViews
    nUps
    nDowns
    # updatedAt
  }
`

const REPLY = gql`
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

const COMMENT = gql`
  fragment comment on Comment {
    __typename
    id
    userId
    isSpot
    text
    # updatedAt
    createdAt
    # replies {
    #   ...reply
    # }
    spotReplies {
      ...reply
    }
    poll {
      ...poll
    }
    count { 
      ...commentCount
    }
  }
  ${REPLY}
  ${POLL}
  ${COMMENT_COUNT}
`

const COMMENT_LIKE = gql`
  fragment commentLike on CommentLike {
    __typename
    id
    commentId
    choice
    updatedAt
  }
`

const REPLY_LIKE = gql`
  fragment replyLike on ReplyLike {
    __typename
    id
    replyId
    choice
    updatedAt
  }
`

const BLOCK_FRAGMENT = gql`
  fragment blockFragment on Block {
    __typename
    id
    template
    props {
      name
      longName
      path
      symbol
      canComment
      canOpenAsPage
      commentIntro {
        ...comment
      }
      commentSymbols {
        ...comment
      }
    }
    body {
      text
      ticks {
        __typename
        id
        symbolId
        value
        at
      }
      table
      chart
    }
    comments {
      ...comment
    }
    link {
      id
      url
      domain
      contentType
      contentId
      contentAuthorId
    }
  }
  ${COMMENT}
`

// ----------------------------
// Query
// ----------------------------

export const BLOCK = gql`
  query block($id: ID,  $path: String) {
    block(id: $id, path: $path) {
      ...blockFragment
      body {
        blocks {
          ...blockFragment
        }
      }
    }
  }
  ${COMMENT}
  ${BLOCK_FRAGMENT}
`

export const COMMENTS = gql`
  query comments($blockId: ID!, $afterId: ID) {
    comments(blockId: $blockId, afterId: $afterId) {
      ...comment
    }
  }
  ${COMMENT}
`

export const COMMENTS_BY_SYMBOL = gql`
  query commentsBySymbol($blockPath: String!, $symbol: String!, $afterId: ID) {
    commentsBySymbol(blockPath: $blockPath, symbol: $symbol, afterId: $afterId) {
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
export const LATEST_PAGES = gql`
  query latestPages($afterId: ID) {
    latestPages(afterId: $afterId) {
      ...blockFragment
    }
  }
  ${BLOCK_FRAGMENT}
`

export const SEARCH_ALL = gql`
  query searchAll($term: String!) {
    searchAll(term: $term)
  }
`

export const SEARCH_PAGE = gql`
  query searchPage($url: String!) {
    searchPage(url: $url) {
      ...blockFragment
    }
  }
  ${BLOCK_FRAGMENT}
`

export const AUTOMARK = gql`
  query automark($text: String!) {
    automark(text: $text)
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
  mutation createReply($commentId: ID!, $data: ReplyInput!) {
    createReply(commentId: $commentId,  data: $data) {
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

export const CREATE_REPLY_LIKE = gql`
  mutation createReplyLike($replyId: ID!, $data: LikeInput!) {
    createReplyLike(replyId: $replyId, data: $data) {
      like {
        ...replyLike
      }
      count {
        ...replyCount
      }
    }
  }
  ${REPLY_LIKE}
  ${REPLY_COUNT}
`

export const UPDATE_REPLY_LIKE = gql`
  mutation updateReplyLike($id: ID!, $data: LikeInput!) {
    updateReplyLike(id: $id, data: $data) {
      like {
        ...replyLike
      }
      count {
        ...replyCount
      }
    }
  }
  ${REPLY_LIKE}
  ${REPLY_COUNT}
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