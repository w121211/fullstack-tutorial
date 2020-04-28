import gql from 'graphql-tag'

export const POST_LIKE = gql`
  fragment postLike on PostLike {
    __typename
    postId
    choice
    updatedAt
  }
`
export const POST_FRAGMENT = gql`
  fragment postFragment on Post {
    __typename
    id
    userId
    cat
    status
    title
    contentText
    contentPoll {
      start
      end
      choices
    }
    contentLink {
      url
    }
    updatedAt
    symbols {
      id
      name
    }
    count {
      id
      nUps
      nDowns
      nComments
      updatedAt
    }
    # mePost @client
    # meLike @client {
    #   ...postLike
    # }
  }
`
export const POST_VOTE = gql`
  fragment postVote on PostVote {
    __typename
    id
    postId
    choice
  }
`
export const COMMENT = gql`
  fragment comment on Comment {
    __typename
    id
    content
    updatedAt
    meComment @client
    meLike @client {
      ...commentLike
    }
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
export const SYMBOL_FRAGMENT = gql`
  fragment symbolFragment on Symbol {
    __typename
    id
    name
    cat
    status
    content
    sysContent
    posts {
      ...postFragment
    }
    # ticks: [Tick!]!
  }
  ${POST_FRAGMENT}
`

// ----------------------------------

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
export const LATEST_POSTS = gql`
  query latestPosts($after: String) {
    latestPosts(after: $after) {
      ...postFragment
      id
    }
  }
  ${POST_FRAGMENT}
`
export const POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      ...postFragment
    }
  }
  ${POST_FRAGMENT}
`
export const COMMENTS = gql`
  query comments($postId: ID!, $after: String) {
    comments(postId: $postId, after: $after) {
      ...comment
    }
  }
  ${COMMENT}
`
export const MY_POST_LIKES = gql`
  query myPostLikes {
    myPostLikes {
      ...postLike
    }
  }
  ${POST_LIKE}
`
export const MY_POST_VOTES = gql`
  query myPostVotes {
    myPostVotes {
      ...postVote
    }
  }
  ${POST_VOTE}
`
export const MY_COMMENT_LIKES = gql`
  query myCommentLikes {
    myCommentLikes {
      ...commentLike
    }
  }
  ${COMMENT_LIKE}
`
export const GET_SYMBOL = gql`
  query getSymbol($name: String!) {
    symbol(name: $name) {
      ...symbolFragment
    }
  }
  ${SYMBOL_FRAGMENT}
`
export const FETCH_PAGE = gql`
  query fetchPage($link: String!) {
    fetchPage(link: $link) {
      id
      post {
        ...postFragment
      }
      title
      symbols
      tags
      events
    }
  }
  ${POST_FRAGMENT}
`

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
export const CREATE_POST = gql`
  mutation createPost($data: PostInput!) {
    createPost(data: $data) {
      ...postFragment
    }
  }
  ${POST_FRAGMENT}
`
export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $data: PostInput!) {
    updatePost(id: $id, data: $data) {
      ...postFragment
    }
  }
  ${POST_FRAGMENT}
`
export const CREATE_POST_LIKE = gql`
  mutation createPostLike($postId: ID!, $data: PostLikeInput!) {
    createPostLike(postId: $postId, data: $data) {
      ...postLike
    }
  }
  ${POST_LIKE}
`
export const UPDATE_POST_LIKE = gql`
  mutation updatePostLike($postId: ID!, $data: PostLikeInput!) {
    updatePostLike(postId: $postId, data: $data) {
      ...postLike
    }
  }
  ${POST_LIKE}
`
export const CREATE_POST_VOTE = gql`
  mutation createPostVote($postId: ID!, $data: PostVoteInput!) {
    createPostVote(postId: $postId, data: $data) {
      ...postVote
    }
  }
  ${POST_VOTE}
`
export const UPDATE_POST_VOTE = gql`
  mutation updatePostVote($postId: ID!, $data: PostVoteInput!) {
    updatePostVote(postId: $postId, data: $data) {
      ...postVote
    }
  }
  ${POST_VOTE}
`
export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $data: CommentInput!) {
    createComment(postId: $postId, data: $data) {
      ...comment
    }
  }
  ${COMMENT}
`
export const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $data: CommentInput!) {
    updateComment(id: $id, data: $data) {
      ...comment
    }
  }
  ${COMMENT}
`
export const CREATE_COMMENT_LIKE = gql`
  mutation createCommentLike($commentId: ID!, $data: CommentLikeInput!) {
    createCommentLike(commentId: $commentId, data: $data) {
      ...commentLike
    }
  }
  ${COMMENT_LIKE}
`
export const UPDATE_COMMENT_LIKE = gql`
  mutation updateCommentLike($commentId: ID!, $data: CommentLikeInput!) {
    updateCommentLike(commentId: $commentId, data: $data) {
      ...commentLike
    }
  }
  ${COMMENT_LIKE}
`
