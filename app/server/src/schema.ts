import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    latestPosts(after: String): [Post!]!
    risingPosts(after: String): [Post!]!
    trendPosts(after: String): [Post!]!
    post(id: ID!): Post!

    comments(postId: ID!, after: String): [Comment!]!

    symbol(name: String!): Symbol!
    ticks(symbolId: ID!, after: String): [Tick!]!
    # event(id: ID!): Event!
    # ticker(id: ID, name: String): Ticker!

    tagHints(input: String): [String!]!
    tickerHints(input: String): [String!]!
    eventHints(input: String): [String!]!

    me: User!
    # me: User  # 使用client-cache的情況會有undefined的可能
    # myPosts: [ID!]!  # 目前post有userId可分辨
    myPostLikes(after: String): [PostLike!]!
    myPostVotes(after: String): [PostVote!]!
    # myComments(after: String): [ID!]!
    myCommentLikes(after: String): [CommentLike!]!
    myFollows: [Follow!]!
    myCommits(after: String): [ID!]!
    myCommitReviews(after: String): [CommitReview!]!
    # myWaitedCommitReviews: [CommitReview!]!

    fetchPage(link: String!): Page!

    ### upcoming ###
    # myBets: [Bet!]!
    # myNotices: [Notice!]!
    # mySignals: [Signal]
    # groups: [Group]
    # myGroups: [Group]
    # groupPosts(groupId: ID): [Post]
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!

    createPost(data: PostInput!): Post!
    updatePost(id: ID!, data: PostInput!): Post!
    createPostLike(postId: ID!, data: PostLikeInput!): PostLike!
    updatePostLike(postId: ID!, data: PostLikeInput!): PostLike!
    createPostVote(postId: ID!, data: PostVoteInput!): PostVote!
    
    # 允許更新postVote？
    updatePostVote(postId: ID!, data: PostVoteInput!): PostVote!

    createComment(postId: ID!, data: CommentInput!): Comment!
    updateComment(id: ID!, data: CommentInput!): Comment!
    createCommentLike(commentId: ID!, data: CommentLikeInput!): CommentLike!
    updateCommentLike(commentId: ID!, data: CommentLikeInput!): CommentLike!

    createCommit(data: CommitInput!): Commit!
    updateCommit(id: ID!, data: CommitInput!): Commit!
    # applyCommitReview(commitId: ID!): ApplyCommitReviewResult!
    applyCommitReview(commitId: ID!): CommitReview!
    updateCommitReview(commitId: ID!, data: CommitReviewInput!): CommitReview!

    createFollow(symbolId: ID!, data: FollowInput!): Follow!
    updateFollow(symbolId: ID!, data: FollowInput!): Follow!

    ### upcoming ###
    
    # uploadImg(): Img
    # createBet(): Bet
    # upsertBet(data: BetInput): Bet
    # createGroup(data: GroupInput): Group
    # updateGroup(data: GroupInput): Group
    # joinGroup(id: ID): Boolean
    # leaveGroup(id: ID): Boolean
    # inviteJoin(groupId: ID, criteria: String): Boolean
  }

  type Page {
    id: ID!
    post: Post # null if not existed
    title: String
    symbols: [String!]
    tags: [String!]
    events: [String!]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    # profileImage: String
    # trips: [Launch]!
  }

  type Post {
    id: ID!
    userId: ID!
    cat: PostCat!
    status: PostStatus!
    title: String
    # content: String
    contentText: String
    contentPoll: PostPoll
    contentLink: PostLink
    symbols: [Symbol!]!
    count: PostCount!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type PostPoll {
    start: DateTime!
    end: DateTime!
    choices: [String!]!
  }

  type PostLink {
    url: String!
  }

  input PostInput {
    cat: PostCat!
    status: PostStatus
    title: String
    contentText: String
    contentPoll: PostPollInput
    contentLink: PostLinkInput
    symbols: [ID!]!
  }

  input PostPollInput {
    start: DateTime!
    end: DateTime!
    choices: [String!]!
  }

  input PostLinkInput {
    url: String!
  }

  type PostLike {
    id: ID!
    postId: ID!
    choice: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input PostLikeInput {
    choice: Int!
  }

  type PostVote {
    id: ID!
    postId: ID!
    choice: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input PostVoteInput {
    choice: Int!
  }

  type PostCount {
    id: ID!
    # nViews: Int!
    nUps: Int!
    nDowns: Int!
    nComments: Int!
    updatedAt: DateTime!
  }

  type Comment {
    id: ID!
    userId: ID!
    status: PostStatus!
    content: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CommentInput {
    status: PostStatus
    content: String!
  }

  type CommentCount {
    id: ID!
    # nViews: Int!
    nUps: Int!
    nDowns: Int!
    updatedAt: DateTime!
  }

  type CommentLike {
    commentId: ID!
    choice: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CommentLikeInput {
    choice: Int!
  }

  type Symbol {
    id: ID!
    name: String!
    cat: SymbolCat!
    status: SymbolStatus!
    content: String
    sysContent: String
    posts: [Post!]!
    ticks: [Tick!]!
    # commits: [ID!]!
  }

  type Follow {
    id: ID!
    symbol: Symbol!
    followed: Boolean!
    # createdAt: DateTime!
    updatedAt: DateTime!
  }

  input FollowInput {
    symbolId: ID!
    followed: Boolean!
  }

  type Commit {
    id: ID!
    symbolId: ID!
    status: CommitStatus!
    action: CommitAction!
    content: String!
    post: Post
    reviews: [CommitReview]
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CommitInput {
    symbolId: ID
    action: CommitAction!
    content: String!
    # postContent: String!
    # post: String!
  }

  type CommitReview {
    id: ID!
    userId: ID!
    choice: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CommitReviewInput {
    commitId: ID!
    choice: Int!
  }

  type Tick {
    id: ID!
    symbolId: ID!
    value: Float!
    at: DateTime!
  }

  enum PostCat {
  LINK
  POST
  POLL
  COMMIT
}

enum PostStatus {
  ACTIVE
  DELETED
  REPORTED
  ARCHIVED
}

enum SymbolCat {
  TAG
  TICKER
  EVENT
  SYS_TICKER_FOLLOWERS
}

enum SymbolStatus {
  ACTIVE
  REPORTED
  ARCHIVED
  DUPLICATED
}

enum CommitStatus {
  REVIEW
  PASS
  REJECT
}

enum CommitAction {
  CREATE
  UPDATE
  DELETE
  MERGE
}

enum LikeChoice {
  UP
  DOWN
  NEUTRAL
}

  scalar DateTime
`
