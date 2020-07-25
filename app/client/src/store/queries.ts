import gql from 'graphql-tag'

export const VOTE = gql`
  fragment vote on Vote {
    __typename
    id
    pollId
    choiceId
    postId
    reward
    createdAt
    updatedAt
  }
`

export const POST_LIKE = gql`
  fragment postLike on PostLike {
    __typename
    id
    postId
    choice
    updatedAt
  }
`

export const POST_COUNT = gql`
  fragment postCount on PostCount {
    __typename
    id
    nViews
    nUps
    nDowns
    nComments
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
    text
    createdAt
    updatedAt
    symbols {
      id
      name
    }
    count { 
      ...postCount
    }
    votes {
      ...vote
    }
  }
  ${POST_COUNT}
  ${VOTE}
`

export const CHOICE = gql`
  fragment choice on Choice {
    __typename
    id
    userId
    text
  }
`

export const POLL_LIKE = gql`
  fragment pollLike on PollLike {
    __typename
    id
    pollId
    choice
    updatedAt
  }
`

export const POLL_COUNT = gql`
  fragment pollCount on PollCount {
    __typename
    id
    nViews
    nUps
    nDowns
    nComments
    nVotes
    nJudgements
    judgeStartedAt
    judgeEndedAt
    verdictValid
    verdictChoice
    updatedAt
  }
`

export const POLL_FRAGMENT = gql`
  fragment pollFragment on Poll {
    __typename
    id
    userId
    cat
    status
    symbols {
      id
      name
    }
    choices {
      ...choice
    }
    title
    text
    start
    end
    nDays
    minVotes
    nDaysJudge
    minJudgments
    count {
      ...pollCount
    }
    posts {
      ...postFragment
    }
    createdAt
  }
  ${POLL_COUNT}
  ${POST_FRAGMENT}
  ${CHOICE}
`

export const COMMENT_COUNT = gql`
  fragment commentCount on CommentCount {
    __typename
    id
    nUps
    nDowns
  }
`

export const COMMENT = gql`
  fragment comment on Comment {
    __typename
    id
    userId
    content
    updatedAt
    count { 
      ...commentCount
    }
    # meComment @client
    # meLike @client {
    #   ...commentLike
    # }
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

export const SYMBOL_FRAGMENT = gql`
  fragment symbolFragment on Symbol {
    __typename
    id
    name
    cat
    status
    body
    sys
    # ticks: [Tick!]!
  }
`

export const COMMIT_REVIEW = gql`
  fragment commitReview on CommitReview {
    __typename
    id
    userId
    choice
    createdAt
    updatedAt
  }
`

export const COMMIT_DETAIL = gql`
  fragment commitDetail on Commit {
    __typename
    id
    symbolId
    status
    action
    content
    post { 
      ...postFragment 
    }
    reviews {
      ...commitReview
    }
    createdAt
    updatedAt
  }
  ${POST_FRAGMENT}
  ${COMMIT_REVIEW}
`

export const COMMIT_TILE = gql`
  fragment commitTile on Commit {
    __typename
    id
    symbolId
    status
    action
    createdAt
    updatedAt
  }
`

export const FOLLOW = gql`
  fragment follow on Follow {
    __typename
    id
    symbolId
    followed
    updatedAt
  }
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
  query latestPosts($symbolId: ID,  $afterId: String) {
    latestPosts(symbolId: $symbolId, afterId: $afterId) {
      ...postFragment
    }
  }
  ${POST_FRAGMENT}
`

export const REPLIED_POSTS = gql`
  query repliedPosts($parentId: ID!, $afterId: String) {
    repliedPosts(parentId: $parentId, afterId: $afterId) {
      ...postFragment
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

export const LATEST_POLLS = gql`
  query latestPolls($symbolId: ID,  $afterId: String) {
    latestPolls(symbolId: $symbolId, afterId: $afterId) {
      ...pollFragment
    }
  }
  ${POLL_FRAGMENT}
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

export const MY_POLL_LIKES = gql`
  query myPollLikes {
    myPollLikes {
      ...pollLike
    }
  }
  ${POLL_LIKE}
`

export const MY_VOTES = gql`
  query myVotes {
    myVotes {
      ...vote
    }
  }
  ${VOTE}
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

export const COMMITS = gql`
  query commits($symbolId: ID!, $after: String) {
    commits(symbolId: $symbolId, after: $after) {
      ...commitTile
    }
  }
  ${COMMIT_TILE}
`

export const COMMIT = gql`
  query commit($id: ID!) {
    commit(id: $id) {
      ...commitDetail
    }
  }
  ${COMMIT_DETAIL}
`

export const MY_FOLLOWS = gql`
  query myFollows {
    myFollows {
      ...follow
    }
  }
  ${FOLLOW}
`




// export const FETCH_PAGE = gql`
//   query fetchPage($url: String!) {
//     fetchPage(url: $url) {
//       id
//       createdPostId
//       suggestTitle
//       suggestTags
//       suggestEvents
//       suggestTickers
//       # null if not created
//       createdEvent {
//         ...symbolFragment
//       }
//     }
//   }
//   ${SYMBOL_FRAGMENT}
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

export const CREATE_POST = gql`
  mutation createPost($data: PostInput!, $pollId: ID) {
    createPost(data: $data,  pollId: $pollId) {
      ...postFragment
    }
  }
  ${POST_FRAGMENT}
`

export const CREATE_VOTE_POST = gql`
  mutation createVotePost($pollId: ID!, $choiceId: ID!, $data: PostInput!) {
    createVotePost(pollId: $pollId, choiceId: $choiceId, data: $data) {
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
  mutation createPostLike($postId: ID!, $data: LikeInput!) {
    createPostLike(postId: $postId, data: $data) {
      like {
        ...postLike
      }
      count {
        ...postCount
      }
    }
  }
  ${POST_LIKE}
  ${POST_COUNT}
`

export const UPDATE_POST_LIKE = gql`
  mutation updatePostLike($id: ID!, $data: LikeInput!) {
    updatePostLike(id: $id, data: $data) {
      like {
        ...postLike
      }
      count {
        ...postCount
      }
    }
  }
  ${POST_LIKE}
  ${POST_COUNT}
`

export const CREATE_POLL = gql`
  mutation createPoll($data: PollInput!) {
    createPoll(data: $data) {
      ...pollFragment
    }
  }
  ${POLL_FRAGMENT}
`

export const CREATE_POLL_LIKE = gql`
  mutation createPollLike($pollId: ID!, $data: LikeInput!) {
    createPollLike(pollId: $pollId, data: $data) {
      like {
        ...pollLike
      }
      count {
        ...pollCount
      }
    }
  }
  ${POLL_LIKE}
  ${POLL_COUNT}
`

export const UPDATE_POLL_LIKE = gql`
  mutation updatePollLike($id: ID!, $data: LikeInput!) {
    updatePollLike(id: $id, data: $data) {
      like {
        ...pollLike
      }
      count {
        ...pollCount
      }
    }
  }
  ${POLL_LIKE}
  ${POLL_COUNT}
`


export const CREATE_VOTE = gql`
  mutation createVote($pollId: ID!, $choiceId: ID!, $postId: ID) {
    createVote(pollId: $pollId, choiceId: $choiceId, postId: $postId) {
      ...vote
    }
  }
  ${VOTE}
`

// export const UPDATE_POLL_VOTE = gql`
//   mutation updatePostVote($postId: ID!, $data: PostVoteInput!) {
//     updatePostVote(postId: $postId, data: $data) {
//       ...postVote
//     }
//   }
//   ${POST_VOTE}
// `

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


export const CREATE_FOLLOW = gql`
  mutation createFollow($symbolId: ID!, $data: FollowInput!) {
    createFollow(symbolId: $symbolId, data: $data) {
      ...follow
    }
  }
  ${FOLLOW}
`
export const UPDATE_FOLLOW = gql`
  mutation updateFollow($symbolId: ID!, $data: FollowInput!) {
    updateFollow(symbolId: $symbolId, data: $data) {
      ...follow
    }
  }
  ${FOLLOW}
`
export const CREATE_COMMIT = gql`
  mutation createCommit($data: CommitInput!) {
    createCommit(data: $data) {
      ...commitTile
    }
  }
  ${COMMIT_TILE}
`
export const UPDATE_COMMIT = gql`
  mutation updateCommit($id: ID!, $data: CommitInput!) {
    updateCommit(id: $id, data: $data) {
      ...commitTile
    }
  }
  ${COMMIT_TILE}
`
export const APPLY_COMMIT_REVIEW = gql`
  mutation applyCommitReview($commitId: ID!) {
    applyCommitReview(commitId: $commitId) {
      ...commitReview
    }
  }
  ${COMMIT_REVIEW}
`
export const UPDATE_COMMIT_REVIEW = gql`
  mutation updateCommitReview($id: ID!, $data: CommitReviewInput!) {
    updateCommitReview(id: $id, data: $data) {
      ...commitReview
    }
  }
  ${COMMIT_REVIEW}
`