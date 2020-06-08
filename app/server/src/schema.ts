import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    latestPosts(after: String): [Post!]!
    _latestPosts(after: String, symbolId: ID): [Post!]!
    risingPosts(after: String): [Post!]!
    trendPosts(after: String): [Post!]!
    symbolPosts(symbolId: ID, after: String): [Post!]!
    post(id: ID!): Post!

    comments(postId: ID!, after: String): [Comment!]!

    symbol(name: String!): Symbol!
    ticks(symbolId: ID!, after: String): [Tick!]!
    # event(id: ID!): Event!
    # ticker(id: ID, name: String): Ticker!
    commit(id: ID!): Commit!
    commits(symbolId: ID!, after: String): [Commit!]!
    
    me: User!
    # me: User  # 使用client-cache的情況會有undefined的可能
    # myPosts: [ID!]!  # 目前post有userId可分辨
    myPostLikes(after: String): [PostLike!]!
    myPollVotes(after: String): [PollVote!]!
    # myComments(after: String): [ID!]!
    myCommentLikes(after: String): [CommentLike!]!
    myFollows: [Follow!]!
    myCommits(after: String): [ID!]!
    myCommitReviews(after: String): [CommitReview!]!
    # myWaitedCommitReviews: [CommitReview!]!

    fetchPage(url: String!): Page!
    tagHints(term: String): [String!]!
    tickerHints(term: String): [String!]!
    eventHints(term: String): [String!]!

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

    createPost(data: PostInput!, parentId: ID): Post!
    updatePost(id: ID!, data: PostInput!): Post!
    createPostLike(postId: ID!, data: LikeInput!): PostLikeResonse!
    updatePostLike(id: ID!, data: LikeInput!): PostLikeResonse!
    createPollVote(pollId: ID!, data: PollVoteInput!): PollVote!
    # 允許更新postVote？
    # updatePollVote(pollId: ID!, data: VoteInput!): PollVote!

    createComment(postId: ID!, data: CommentInput!): Comment!
    updateComment(id: ID!, data: CommentInput!): Comment!
    createCommentLike(commentId: ID!, data: LikeInput!): CommentLike!
    updateCommentLike(id: ID!, data: LikeInput!): CommentLike!

    createCommit(data: CommitInput!): Commit!
    updateCommit(id: ID!, data: CommitInput!): Commit!
    # applyCommitReview(commitId: ID!): ApplyCommitReviewResult!
    applyCommitReview(commitId: ID!): CommitReview!
    updateCommitReview(id: ID!, data: CommitReviewInput!): CommitReview!

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
    # null if not existed
    createdPostId: ID
    # symbols: [String!]
    suggestTitle: String
    suggestTags: [String!]!
    suggestEvents: [String!]!
    suggestTickers: [String!]!
    # null if not created
    createdEvent: Symbol
  }

  type EventContent {
    tags: [String!]!
    tickers: [String!]!
    events: [String!]!
    equalEvents: [String!]!
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

  type Poll {
    id: ID!
    status: PollStatus!
    start: DateTime!
    end: DateTime!
    choices: [String!]!
    nDays: Int!
    minVotes: Int!
    nDaysJudge: Int!
    minJudgments: Int!
  }

    # type PostLink {
  #   url: String!
  # }

  

  type Post {
    id: ID!
    userId: ID!
    cat: PostCat!
    status: PostStatus!
    title: String!
    text: String!
    poll: Poll
    # link: Link
    symbols: [Symbol!]!
    count: PostCount!
    createdAt: DateTime
    updatedAt: DateTime
    parent: PostPeek
    children: [PostPeek]
  }

  type PostPeek {
    id: ID!
    cat: PostCat
    title: String
  }

  input PostInput {
    cat: PostCat!
    status: PostStatus
    title: String
    symbolIds: [ID!]!
    text: String
    poll: PollInput
  }

  input PollInput {
    choices: [String!]!
    nDays: Int!
  }

  # input PostLinkInput {
  #   url: String!
  # }

  type PostLike {
    id: ID!
    postId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PostLikeResonse {
    like: PostLike!
    count: PostCount!
  }

  input LikeInput {
    choice: LikeChoice!
  }

  type PollVote {
    id: ID!
    pollId: ID!
    choice: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PollJudgment {
    id: ID!
    pollId: ID!
    choice: Int!
    comment: Comment!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input PollVoteInput {
    choice: Int!
  }

  input PollJudgmentInput {
    choice: Int!
  }

  type PostCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    nComments: Int!
    updatedAt: DateTime!
    poll: PollCount
  }

  type PollCount {
    nVotes: [Int!]!,
    nJudgements: [Int],
    judgeStartedAt: DateTime,
    judgeEndedAt: DateTime,
    verdictValid: Boolean,
    verdictChoice: Int,
    # failedMsg: String,
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
    id: ID!
    commentId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Symbol {
    id: ID!
    name: String!
    cat: SymbolCat!
    status: SymbolStatus!
    body: String
    sys: String
    # posts: [Post!]!
    ticks: [Tick!]!
    # commits: [ID!]!
  }

  type Follow {
    id: ID!
    # symbol: Symbol!
    symbolId: ID!
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
    post: Post!
    # TODO:洩漏問題？
    reviews: [CommitReview!]!
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
    # commitId: ID!
    choice: Int!
  }

  type Tick {
    id: ID!
    symbolId: ID!
    value: Float!
    at: DateTime!
  }

  enum PostCat {
    IDEA
    ASK
    POLL
    LINK
    COMMIT
    REPLY
  }

  enum PostStatus {
    ACTIVE
    LOCK
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

  enum PollStatus {
    OPEN
    JUDGE
    CLOSE_SUCCESS
    CLOSE_FAIL
  }

  scalar DateTime
`
