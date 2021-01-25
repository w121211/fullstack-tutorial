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
    count {
      nVotes
    }
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
    isTop
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
    cocardId
    ocardId
    selfcardId
    isTop
    text
    # updatedAt
    createdAt
    replies {
      ...reply
    }
    topReplies {
      ...reply
    }
    poll {
      ...poll
    }
    count { 
      ...commentCount
    }
    meta {
      seq
      mark
      src
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

const LINK_FRAGMENT = gql`
  fragment linkFragment on Link {
      __typename
      id
      url
      domain
      contentType
      contentId
      oauthorName
    }
`

const COCARD_FRAGMENT = gql`
  fragment cocardFragment on Cocard {
    __typename
    id
    template
    # meta
    comments {
      ...comment
    }
    link {
      ...linkFragment
    }
  }
  ${COMMENT}
  ${LINK_FRAGMENT}
`

const OCARD_FRAGMENT = gql`
  fragment ocardFragment on Ocard {
    __typename
    id
    template
    comments {
      ...comment
    }
    symbol {
      name
      cat
    }
    oauthorName
  }
  ${COMMENT}
`

const SELFCARD_FRAGMENT = gql`
  fragment selfcardFragment on Selfcard {
    __typename
    id
    template
    comments {
      ...comment
    }
    symbol {
      name
      cat
    }
  }
  ${COMMENT}
`

// ----------------------------
// Query
// ----------------------------

// export const FETCH_LINK = gql`
//   query fetchLink($url: String!) {
//     fetchLink(url: $url) {
//       ...linkFragment
//     }
//   }
//   ${LINK_FRAGMENT}
// `

export const COCARD = gql`
  query cocard($symbolName: String, $url: String) {
    cocard(symbolName: $symbolName, url: $url) {
      ...cocardFragment
    }
  }
  ${COCARD_FRAGMENT}
`

export const OCARD = gql`
  query ocard($id: ID, $oauthorName: String, $symbolName: String) {
    ocard(id: $id, oauthorName: $oauthorName, symbolName: $symbolName) {
      ...ocardFragment
    }
  }
  ${OCARD_FRAGMENT}
`

export const SELFCARD = gql`
  query selfcard($id: ID!) {
    selfcard(id: $id) {
      ...selfcardFragment
    }
  }
  ${SELFCARD_FRAGMENT}
`

export const MYCARD = gql`
  query mycard($symbolName: String!) {
    mycard(symbolName: $symbolName) {
      ...selfcardFragment
    }
  }
  ${SELFCARD_FRAGMENT}
`

export const COMMENTS = gql`
  query comments($cardId: ID!, $afterId: ID) {
    comments(cardId: $cardId, afterId: $afterId) {
      ...comment
    }
  }
  ${COMMENT}
`

export const COMMENTS_BY_SYMBOL = gql`
  query commentsBySymbol($pageTitle: String!, $symbol: String!, $afterId: ID) {
    commentsBySymbol(pageTitle: $pageTitle, symbol: $symbol, afterId: $afterId) {
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

export const SEARCH_ALL = gql`
  query searchAll($term: String!) {
    searchAll(term: $term)
  }
`

export const AUTOMARK = gql`
  query automark($text: String!) {
    automark(text: $text)
  }
`

// ----------------------------
// mutation
// ----------------------------

export const CREATE_MYCARD = gql`
  mutation createMycard($symbolName: String!, $data: [CommentInput!]!) {
    createMycard(symbolName: $symbolName, data: $data) {
      ...selfcardFragment
    }
  }
  ${SELFCARD_FRAGMENT}
`

export const CREATE_OCARD = gql`
  mutation createOcard($symbolName: String!, $oauthorName: String!, $data: [CommentInput!]!) {
    createOcard(symbolName: $symbolName, oauthorName: $oauthorName, data: $data)  {
      ...ocardFragment
    }
  }
  ${OCARD_FRAGMENT}
`

// export const CREATE_COCARD = gql`
//   mutation createCocard($url: String!) {
//     createCocard(url: $url)  {
//       ...cocardFragment
//     }
//   }
//   ${COCARD_FRAGMENT}
// `


export const CREATE_COMMENTS = gql`
  mutation createComments($cardId: String!, $cardType: String!, $symbolName: String, $data: [CommentInput!]!) {
    createComments(cardId: $cardId, cardType: $cardType, symbolName: $symbolName, data: $data) {
      ...comment
    }
  }
  ${COMMENT}
`

export const CREATE_COMMENT = gql`
  mutation createComment($cardIds: [CardIdInput!], $data: CommentInput!) {
    createComment(cardId: $cardId,  cardType: $cardType, data: $data) {
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