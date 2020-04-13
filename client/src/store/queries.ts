import gql from 'graphql-tag';

export const LIKE = gql`
  fragment like on Like {
    __typename
    id
    feedId
    postId
    pollId
    commentId
    choice
    updatedAt
  }
`

export const COMMENT = gql`
  fragment comment on Comment {
    __typename
    id
    body
    meLike @client {
      ...like
    }
  }
  ${LIKE}
`

// ----------------------------
// Getters
// ----------------------------

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

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

export const MY_LIKES = gql`
  query MyLikes {
    myLikes {
      ...like
    }
  }
  ${LIKE}
`

export const FEEDS = gql`
  query Feeds($after: String) {
    feeds(after: $after) {
      id
      header
      body
      updatedAt
      tags {
        id
        name
      }
      tickers {
        id
        name
      }
      stats {
        nViews
        nVoteUps
        nVoteDowns
        nComments
      }
    }
  }
`

export const COMMENTS = gql`
  query Comments($feedId: ID!, $after: String) {
    comments(feedId: $feedId, after: $after) {
      ...comment
    }
  }
  ${COMMENT}
`

export const GET_FEED = gql`
  query GetFeed($id: ID!) {
    feed(id: $id) {
      id
      header
      isClicked @client
    }
  }
`

export const GET_ME = gql`
  query GetMe {
    me {
      id
    }
  }
`

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      slug
      header
      tickers {
        id
        name
      }
      # comments {
      #   ...CommentTile
      # }
      # stats {
      #   nViews
      #   nVoteUps
      #   nVoteDowns
      # }
      # isInCart @client
      # site
      # rocket {
        # type
      # }
      # ...LaunchTile
    }
  }
`

// ----------------------------
// Setters
// ----------------------------

export const CREATE_LIKE = gql`
  mutation CreateLike($data: LikeInput!) {
    createLike(data: $data) {
      ...like
    }
  }
  ${LIKE}
`

export const UPDATE_LIKE = gql`
  mutation UpdateLike($id: ID!, $data: LikeInput!) {
    updateLike(id: $id, data: $data) {
      ...like
    }
  }
  ${LIKE}
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

export const UPSERT_FEED = gql`
  mutation UpsertFeed($id: ID, $data: FeedInput!) {
    upsertFeed(id: $id, data: $data) {
      id
    }
  }
`