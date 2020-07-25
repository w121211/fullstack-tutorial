import gql from 'graphql-tag'

export const typeDefs = gql`

  type Query {
    roboPolls(symbolName: String): [Poll!]!

    latestPolls(symbolId: ID, afterId: String): [Poll!]!

    pollHints(symbols: [String], title: String): [Poll!]!

    poll(id: ID!): Poll!

    myPollLikes(afterId: ID): [PollLike!]!

    post(id: ID!): Post!

    latestPosts(symbolId: ID, afterId: String): [Post!]!
    repliedPosts(parentId: ID!, afterId: String): [Post!]!
    risingPosts(afterId: String): [Post!]!
    trendPosts(afterId: String): [Post!]!

    comments(postId: ID!, after: String): [Comment!]!

    symbol(name: String!): Symbol!
    ticks(symbolId: ID!, after: String): [Tick!]!
    # event(id: ID!): Event!
    # ticker(id: ID, name: String): Ticker!
    commit(id: ID!): Commit!
    commits(symbolId: ID!, after: String): [Commit!]!
    
    me: User!
    # myComments(after: String): [ID!]!
    myPosts(afterId: String): [Post!]!

    myVotes(after: String): [Vote!]!
    myPostLikes(after: String): [PostLike!]!
    myCommentLikes(after: String): [CommentLike!]!

    myFollows: [Follow!]!
    myCommits(after: String): [ID!]!
    myCommitReviews(after: String): [CommitReview!]!
    # myWaitedCommitReviews: [CommitReview!]!

    tagHints(term: String): [String!]!
    tickerHints(term: String): [String!]!
    eventHints(term: String): [String!]!

    ### upcoming ###
    # fetchPage(url: String!): Page!

    # myBets: [Bet!]!
    # myNotices: [Notice!]!
    # mySignals: [Signal]
    # groups: [Group]
    # myGroups: [Group]
    # groupPosts(groupId: ID): [Post]
  }

  type Mutation {
    createPoll(data: PollInput!): Poll!

    createPollLike(pollId: ID!, data: LikeInput!): PollLikeResonse!
    updatePollLike(id: ID!, data: LikeInput!): PollLikeResonse!

    # createVote(pollId: ID!, data: VoteInput!): Vote!
    createVote(pollId: ID!, choiceId: ID!, postId: ID): Vote!

    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!

    createVotePost(pollId: ID!, choiceId: ID!, data: PostInput!): Post!

    createPost(data: PostInput!, pollId: ID): Post!
    updatePost(id: ID!, data: PostInput!): Post!

    createPostLike(postId: ID!, data: LikeInput!): PostLikeResonse!
    updatePostLike(id: ID!, data: LikeInput!): PostLikeResonse!

    createComment(postId: ID!, data: CommentInput!): Comment!
    updateComment(id: ID!, data: CommentInput!): Comment!
    
    createCommentLike(commentId: ID!, data: LikeInput!): CommentLikeResonse!
    updateCommentLike(id: ID!, data: LikeInput!): CommentLikeResonse!

    # 允許更新postVote？
    # updatePollVote(pollId: ID!, data: VoteInput!): PollVote!

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


  type Post {
    id: ID!
    userId: ID!
    cat: PostCat!
    status: PostStatus!
    text: String!
    symbols: [Symbol!]
    count: PostCount!
    createdAt: DateTime
    updatedAt: DateTime
    votes: [Vote!]!
    # voteCommits: [VoteCommit!]!
  }

  input PostInput {
    cat: PostCat!
    symbolIds: [ID!]!
    text: String
  }

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

  type PostCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    nComments: Int!
    updatedAt: DateTime!
  }


  type Poll {
    id: ID!
    userId: ID!
    cat: PollCat!
    status: PollStatus!
    symbols: [Symbol!]
    choices: [Choice!]!
    title: String!
    text: String
    start: DateTime!
    end: DateTime!
    nDays: Int!
    minVotes: Int!
    nDaysJudge: Int!
    minJudgments: Int!
    count: PollCount!
    posts: [Post!]!
    createdAt: DateTime!
  }

  input PollInput {
    cat: PollCat!
    symbolIds: [ID!]!
    choices: [String!]!
    title: String!
    text: String
    nDays: Int!
  }

  type Choice {
    id: ID!
    userId: ID!
    text: String!
  }

  type PollLike {
    id: ID!
    pollId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PollLikeResonse {
    like: PollLike!
    count: PollCount!
  }

  type PollCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    nComments: Int!
    nVotes: [Int!]!
    nJudgements: [Int]
    judgeStartedAt: DateTime
    judgeEndedAt: DateTime
    verdictValid: Boolean
    verdictChoice: Int
    updatedAt: DateTime!
    # failedMsg: String
  }

  type Vote {
    id: ID!
    pollId: ID!
    choiceId: ID!
    postId: ID
    reward: Float
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input VoteInput {
    choiceId: ID!
  }

  type PollJudgment {
    id: ID!
    pollId: ID!
    choice: Int!
    comment: Comment!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input PollJudgmentInput {
    choice: Int!
  }


  # type Page {
  #   id: ID!
  #   # null if not existed
  #   createdPostId: ID
  #   # symbols: [String!]
  #   suggestTitle: String
  #   suggestTags: [String!]!
  #   suggestEvents: [String!]!
  #   suggestTickers: [String!]!
  #   # null if not created
  #   createdEvent: Symbol
  # }

  # type EventContent {
  #   tags: [String!]!
  #   tickers: [String!]!
  #   events: [String!]!
  #   equalEvents: [String!]!
  # }


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

    # type PostLink {
  #   url: String!
  # }

  
  input LikeInput {
    choice: LikeChoice!
  }

  
  
  
  type Comment {
    id: ID!
    userId: ID!
    status: PostStatus!
    content: String
    count: CommentCount!
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
    # updatedAt: DateTime!
  }

  type CommentLike {
    id: ID!
    commentId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CommentLikeResonse {
    like: CommentLike!
    count: CommentCount!
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
    LINK
    REPLY
  }

  enum PostStatus {
    ACTIVE
    LOCK
    DELETED
    REPORTED
    ARCHIVED
  }

  enum PollCat {
    FIXED
    ADD
    ADD_BY_POST
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
