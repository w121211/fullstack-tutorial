import gql from 'graphql-tag'

export const POST_LIKE = gql`
  fragment postLike on PostLike {
    __typename
    postId
    choice
    updatedAt
  }
`
export const _POST = gql`
  fragment post on Post {
    id
    view
    title
    content
    updatedAt
    symbols {
      id
      slug
    }
    count {
      id
      nViews
      nUps
      nDowns
      nComments
      updatedAt
    }
    # meLike @client {
    #   ...postLike
    # }
  }
`
export const COMMENT_LIKE = gql`
  fragment commentLike on CommentLike {
    __typename
    commentId
    choice
    updatedAt
  }
`
export const COMMENT = gql`
  fragment comment on Comment {
    __typename
    id
    view
    content
    updatedAt
    # meLike @client {
    #   ...commentLike
    # }
  }
`

// Query

export const NEW_FEED = gql`
  query newFeed($after: String) {
    newFeed(after: $after) {
      ...post
    }
    ${_POST}
  }
`
export const POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      ...post
    }
    ${_POST}
  }
`
export const COMMENTS = gql`
  query comments($postId: ID!, $after: String) {
    comments(postId: $postId, after: $after) {
      ...comment
    }
  }
  ${COMMENT}
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
export const MY_POST_LIKES = gql`
  query myPostLikes {
    myPostLikes {
      ...postLike
    }
  }
  ${POST_LIKE}
`
export const MY_COMMENT_LIKES = gql`
  query myCommentLikes {
    myCommentLikes {
      ...commentLike
    }
  }
  ${COMMENT_LIKE}
`
export const GET_ME = gql`
  query GetMe {
    me {
      id
    }
  }
`
// export const GET_EVENT = gql`
//   query GetEvent($id: ID!) {
//     event(id: $id) {
//       slug
//       header
//       tickers {
//         id
//         name
//       }
//       # comments {
//       #   ...CommentTile
//       # }
//       # stats {
//       #   nViews
//       #   nVoteUps
//       #   nVoteDowns
//       # }
//       # isInCart @client
//       # site
//       # rocket {
//       # type
//       # }
//       # ...LaunchTile
//     }
//   }
// `

// ----------------------------
// mutation
// ----------------------------

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
export const FETCH_PAGE = gql`
  mutation fetchPage($link: String!) {
    fetchPage(link: $link) {
      id
      post {
        id
        title
      }
      title
      symbols
      tags
      events
    }
  }
`
export const CREATE_POST = gql`
  mutation createPost($data: PostInput!) {
    createPost(data: $data) {
      ...post
    }
  }
  ${_POST}
`
export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $data: PostInput!) {
    updatePost(id: $id, data: $data) {
      ...post
    }
  }
  ${_POST}
`
export const CREATE_POST_LIKE = gql`
  mutation createPostLike($postId: ID!, $data: LikeInput!) {
    createPostLike(postId: $postId, data: $data) {
      ...postLike
    }
  }
  ${POST_LIKE}
`
export const UPDATE_POST_LIKE = gql`
  mutation updatePostLike($postId: ID!, $data: LikeInput!) {
    updatePostLike(postId: $postId, data: $data) {
      ...postLike
    }
  }
  ${POST_LIKE}
`
export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CommentInput!) {
    createComment(data: $data) {
      ...comment
    }
  }
  ${COMMENT}
`
export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $data: CommentInput!) {
    updateComment(id: $id, data: $data) {
      ...comment
    }
  }
  ${COMMENT}
`
