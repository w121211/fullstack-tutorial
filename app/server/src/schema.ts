import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    # 搜尋ticker, topics，近似字搜尋（ElasticSearch？）
    searchAll(term: String!): [String!]!
    searchTopic(term: String!): [String!]!
    # searchTopic(term: String!): [String!]!

    latestCards(afterId: String): [Cocard!]!

    # 以symbol, url(擇一)尋找，若找不到則自動創一個新的
    cocard(url: String!): Cocard

    # 以下card目前暫時不考慮（留在這裡只是因為都已經寫了，懶得再拿掉）
    ocard(id: ID, oauthorName: String, symbolName: String): Ocard
    selfcard(id: ID!): Selfcard
    mycard(symbolName: String!): Selfcard

    # 所有的comments（含spot），幫助cache，僅含spotReplies
    # comments(cardId: ID!, afterId: ID): [Comment!]!
    # 用於filter comments的情形（例如：/q, /stage, ...)
    # commentsBySymbol(pageTitle: String!, symbol: String!, afterId: ID): [Comment!]!

    # 專用於顯示
    # topComments(blockId: ID!, afterId: ID): [CommentWithReplies!]!

    anchor(id: ID!): Anchor

    comment(id: ID!): Comment

    replies(commentId: ID!, afterId: ID): [Reply!]!

    me: User!

    myVotes(after: String): [Vote!]!

    myAnchorLikes(after: String): [AnchorLike!]!
    myCommentLikes(after: String): [CommentLike!]!
    myReplyLikes(after: String): [ReplyLike!]!

    # 自動標註可能的topic, tickers
    automark(text: String!): String!

    # --- NEXT ---

    # ticks(symbolId: ID!, after: String): [Tick!]!

    # trendTopics: [String!]!
    # newTopics: [String!]!
    # newTickers: [String!]!

    # botPolls(symbolName: String): [Poll!]!
    # latestPolls(symbolId: ID, afterId: String): [Poll!]!
    # pollHints(symbols: [String], title: String): [Poll!]!
    # poll(id: ID!): Poll!

    # myPollLikes(afterId: ID): [PollLike!]!

    # latestPosts(symbolId: ID, afterId: String): [Post!]!
    # repliedPosts(parentId: ID!, afterId: String): [Post!]!
    # risingPosts(afterId: String): [Post!]!
    # trendPosts(afterId: String): [Post!]!

    # symbol(name: String!): Symbol!

    # post(id: ID!): Post!
    # event(id: ID!): Event!
    # ticker(id: ID, name: String): Ticker!
    # commit(id: ID!): Commit!
    # commits(symbolId: ID!, after: String): [Commit!]!

    # myPostLikes(after: String): [PostLike!]!
    # myCommentLikes(after: String): [CommentLike!]!

    # myComments(after: String): [ID!]!
    # myPosts(afterId: String): [Post!]!
    # myFollows: [Follow!]!
    # myCommits(after: String): [ID!]!
    # myCommitReviews(after: String): [CommitReview!]!
    # myWaitedCommitReviews: [CommitReview!]!

    # tagHints(term: String): [String!]!
    # tickerHints(term: String): [String!]!
    # eventHints(term: String): [String!]!

    # fetchPage(url: String!): Page!

    # myBets: [Bet!]!
    # myNotices: [Notice!]!
    # mySignals: [Signal]
    # groups: [Group]
    # myGroups: [Group]
    # groupPosts(groupId: ID): [Post]
  }

  type Mutation {
    # 創cardBody，同步更新nested-card
    createCardBody(cardId: ID, data: CardBodyInput!): CardBody!

    # createOcard(symbolName: String!, oauthorName: String!, data: [CommentInput!]!): Ocard!
    createMycard(symbolName: String!): Selfcard!
    createMycardBody(cardId: ID, data: CardBodyInput!): CardBody!

    # createComment(cardIds: [CardIdInput!]!, data: CommentInput!): Comment!
    # updateComment(id: ID!, data: CommentInput!): Comment!

    createReply(commentId: ID!, data: ReplyInput!): Reply!
    # updateComment(id: ID!, data: CommentInput!): Comment!

    createVote(pollId: ID!, choiceIdx: Int!): Vote!

    createAnchorLike(anchorId: ID!, data: LikeInput!): AnchorLikeResonse!
    updateAnchorLike(id: ID!, data: LikeInput!): AnchorLikeResonse!
    createCommentLike(commentId: ID!, data: LikeInput!): CommentLikeResonse!
    updateCommentLike(id: ID!, data: LikeInput!): CommentLikeResonse!
    createReplyLike(replyId: ID!, data: LikeInput!): ReplyLikeResonse!
    updateReplyLike(id: ID!, data: LikeInput!): ReplyLikeResonse!

    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!

    # --- NEXT ---

    createPoll(data: PollInput!): Poll!
    createPollLike(pollId: ID!, data: LikeInput!): PollLikeResonse!
    updatePollLike(id: ID!, data: LikeInput!): PollLikeResonse!

    # createVotePost(pollId: ID!, choiceId: ID!, data: PostInput!): Post!
    # createPost(data: PostInput!, pollId: ID): Post!
    # updatePost(id: ID!, data: PostInput!): Post!
    # createPostLike(postId: ID!, data: LikeInput!): PostLikeResonse!
    # updatePostLike(id: ID!, data: LikeInput!): PostLikeResonse!

    # 允許更新postVote？
    # updatePollVote(pollId: ID!, data: VoteInput!): PollVote!

    # createCommit(data: CommitInput!): Commit!
    # updateCommit(id: ID!, data: CommitInput!): Commit!
    # applyCommitReview(commitId: ID!): ApplyCommitReviewResult!
    # applyCommitReview(commitId: ID!): CommitReview!
    # updateCommitReview(id: ID!, data: CommitReviewInput!): CommitReview!

    # createFollow(symbolId: ID!, data: FollowInput!): Follow!
    # updateFollow(symbolId: ID!, data: FollowInput!): Follow!

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

  # type Choice {
  #   id: ID!
  #   userId: ID!
  #   text: String!
  # }

  type Vote {
    id: ID!
    pollId: ID!
    choiceIdx: Int!
    # reward: Float
    # createdAt: DateTime!
    # updatedAt: DateTime!
  }

  type PollCount {
    id: ID!
    # nViews: Int!
    # nUps: Int!
    # nDowns: Int!
    # nComments: Int!
    nVotes: [Int!]!
    # nJudgements: [Int]
    # judgeStartedAt: DateTime
    # judgeEndedAt: DateTime
    # verdictValid: Boolean
    # verdictChoice: Int
    # updatedAt: DateTime!
    # failedMsg: String
  }

  type Poll {
    id: ID!
    commentId: ID!
    # userId: ID!
    # cat: PollCat!
    # status: PollStatus!
    choices: [String!]!
    # nVotes: [Int!]!
    count: PollCount!
    # title: String!
    # text: String
    # start: DateTime!
    # end: DateTime!
    # nDays: Int!
    # minVotes: Int!
    # nDaysJudge: Int!
    # minJudgments: Int!
    # count: PollCount!
    # posts: [Post!]!
    createdAt: DateTime!
  }

  type AnchorLike {
    id: ID!
    anchorId: Int!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AnchorCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
  }

  type Anchor {
    id: ID!
    userId: ID!
    count: AnchorCount!
    cocardId: Int
    ocardId: Int
    selfcardId: Int
    # updatedAt: DateTime!
  }

  type AnchorLikeResonse {
    like: AnchorLike!
    count: AnchorCount!
  }

  type ReplyCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    # nComments: Int!
    # updatedAt: DateTime!
  }

  type ReplyProps {
    label: String
    disableUpndown: Boolean
  }

  type Reply {
    id: ID!
    userId: ID!
    isTop: Boolean
    text: String!
    count: ReplyCount!
    updatedAt: DateTime!

    props: ReplyProps
  }

  type CommentCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    # nComments: Int!
    # updatedAt: DateTime!
  }

  type CommentProps {
    # 'TOPIC', 'TICKER', 'WEBLINK'
    validator: String
    # 'K_1_V', 'K_N_V', 'K_ONLY', 'CM'
    showAs: String
    # 'HOR', 'VER'
    showReplyDir: String

    disableReply: Boolean
    # suggestedReplies?: string[],
  }

  type CommentMeta {
    seq: Int
    mark: String
    src: String
    # commentIds: [Int!]
  }

  type Comment {
    id: ID!
    userId: String!
    symbols: [Symbol!]
    # null表示無需topReplies
    topReplies: [Reply!]
    replies: [Reply!]
    # cat: CommentCat!
    isTop: Boolean
    text: String
    count: CommentCount!
    createdAt: DateTime!
    # updatedAt: DateTime!
    poll: Poll

    meta: CommentMeta
    cocardId: Int
    ocardId: Int
    selfcardId: Int
  }

  type CommentLike {
    id: ID!
    commentId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ReplyLike {
    id: ID!
    replyId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CommentLikeResonse {
    like: CommentLike!
    count: CommentCount!
  }

  type ReplyLikeResonse {
    like: ReplyLike!
    count: ReplyCount!
  }

  type Link {
    id: ID!
    url: String!
    domain: String!
    srcType: String!
    srcId: String
    oauthorName: String
  }

  # type corrTicker {
  #   ticker: String
  #   corr: Float
  #   createdAt: DateTime
  # }

  type Linemeta {
    linenumber: Int!
    userId: String!
    anchorId: Int!
    stampId: String!
    src: String

    # new: Boolean
    reply: Boolean
    poll: Boolean
    broken: Boolean
    nested: Boolean

    pollId: Int
    commentId: Int
  }

  type CardBody {
    id: ID!
    userId: String!
    text: String!
    prevId: Int
    # linemetas: [Linemeta!]!
  }

  type Cocard {
    id: ID!
    template: CardTemplate!
    meta: String
    link: Link!
    body: CardBody
  }

  type Ocard {
    id: ID!
    template: CardTemplate!
    symbol: Symbol!
    oauthorName: String!
    body: CardBody!
  }

  type Selfcard {
    id: ID!
    template: CardTemplate!
    symbol: Symbol!
    # user: User!
    body: CardBody!
  }

  enum CommentCat {
    TEXT
    POLL
    PROP
  }

  enum CommentStatus {
    ACTIVE
    LOCK
    DELETED
    REPORTED
    ARCHIVED
  }

  enum LikeChoice {
    UP
    DOWN
    NEUTRAL
  }

  input CardIdInput {
    id: String!
    type: String!
  }

  input ReplyInput {
    text: String!
  }

  input PollInput {
    # cat: PollCat!
    choices: [String!]!
  }

  input CommentInput {
    # status: PostStatus
    # content: String!
    # symbolIds: [ID!]!
    # cat: CommentCat!
    # symbols: [String!]!
    mark: String!
    src: String
    text: String!
    poll: PollInput
  }

  input LikeInput {
    choice: LikeChoice!
  }

  input CardIdentifierInput {
    symbolName: String!
    oauthorName: String
  }

  input MarkerInput {
    mark: String!
    value: String!
    # error?: string
  }

  input LinemetaInput {
    linenumber: Int!
    userId: String
    anchorId: Int
    stampId: String!
    src: String

    new: Boolean
    reply: Boolean
    poll: Boolean
    broken: Boolean
    nested: Boolean

    pollId: Int
    commentId: Int

    nestedCard: CardIdentifierInput
    marker: MarkerInput
  }

  input CardBodyInput {
    text: String!
  }

  # --- NEXT ---

  type Tick {
    id: ID!
    symbolId: ID!
    value: Float!
    at: DateTime!
  }

  # type Post {
  #   id: ID!
  #   userId: ID!
  #   cat: PostCat!
  #   status: PostStatus!
  #   text: String!
  #   symbols: [Symbol!]
  #   # count: PostCount!
  #   createdAt: DateTime
  #   updatedAt: DateTime
  #   votes: [Vote!]!
  #   # voteCommits: [VoteCommit!]!
  # }

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

  # type PostLink {
  #   url: String!
  # }

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

  # type Commit {
  #   id: ID!
  #   symbolId: ID!
  #   status: CommitStatus!
  #   action: CommitAction!
  #   content: String!
  #   # post: Post!
  #   # TODO:洩漏問題？
  #   reviews: [CommitReview!]!
  #   createdAt: DateTime
  #   updatedAt: DateTime
  # }

  # input CommitInput {
  #   symbolId: ID
  #   action: CommitAction!
  #   content: String!
  #   # postContent: String!
  #   # post: String!
  # }

  # type CommitReview {
  #   id: ID!
  #   userId: ID!
  #   choice: Int!
  #   createdAt: DateTime
  #   updatedAt: DateTime
  # }

  # input CommitReviewInput {
  #   # commitId: ID!
  #   choice: Int!
  # }

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
    TICKER
    TOPIC
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

  enum PollStatus {
    OPEN
    JUDGE
    CLOSE_SUCCESS
    CLOSE_FAIL
  }

  enum CardTemplate {
    TICKER
    TOPIC
    WEBPAGE
  }

  scalar DateTime
`
