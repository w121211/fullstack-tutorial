import gql from 'graphql-tag'

export const typeDefs = gql`

type Query {
  fetchLink(url: String!): Link!

  # 可允許用id、symbolName來尋找
  cocard(symbolName: String, linkUrl: String): Cocard
  ocard(id: ID, oauthorName: String, symbolName: String): Ocard
  selfcard(id: ID!): Selfcard
  mycard(symbolName: String!): Selfcard

  # 會包含comments & nestedBlockComments，這裡的comments(含spot, new, spotReplies...)用於顯示
  # page(id: ID, title: String, symbolName: String, symbolId: Int): Page
  # 最新加入的page，加入條件：被comment, 被bot捕捉
  # latestPages(afterId: ID): [Page!]!

  # 所有的comments（含spot），幫助cache，僅含spotReplies
  comments(cardId: ID!, afterId: ID): [Comment!]!
  # 用於filter comments的情形（例如：/q, /stage, ...)
  commentsBySymbol(pageTitle: String!, symbol: String!, afterId: ID): [Comment!]!

  # 專用於顯示
  # topComments(blockId: ID!, afterId: ID): [CommentWithReplies!]!
  replies(commentId: ID!, afterId: ID): [Reply!]!

  ticks(symbolId: ID!, after: String): [Tick!]!

  me: User!

  myCommentLikes(after: String): [CommentLike!]!
  myReplyLikes(after: String): [ReplyLike!]!
  myVotes(after: String): [Vote!]!

  # 搜尋ticker, topics，近似字搜尋（ElasticSearch？）
  searchAll(term: String!): [String!]!
  searchTopic(term: String!): [String!]!
  # searchTopic(term: String!): [String!]!
  # 用url搜尋page，看是否已建立？
  # searchPage(url: String!): Page

  # 自動標註可能的topic, tickers
  automark(text: String!): String!

  # --- NEXT ---
  trendTopics: [String!]!
  newTopics: [String!]!
  newTickers: [String!]!

  botPolls(symbolName: String): [Poll!]!
  latestPolls(symbolId: ID, afterId: String): [Poll!]!
  pollHints(symbols: [String], title: String): [Poll!]!
  poll(id: ID!): Poll!

  # myPollLikes(afterId: ID): [PollLike!]!

  latestPosts(symbolId: ID, afterId: String): [Post!]!
  repliedPosts(parentId: ID!, afterId: String): [Post!]!
  risingPosts(afterId: String): [Post!]!
  trendPosts(afterId: String): [Post!]!

  symbol(name: String!): Symbol!
  
  # post(id: ID!): Post!
  # event(id: ID!): Event!
  # ticker(id: ID, name: String): Ticker!
  # commit(id: ID!): Commit!
  # commits(symbolId: ID!, after: String): [Commit!]!
  
  
  # myPostLikes(after: String): [PostLike!]!
  # myCommentLikes(after: String): [CommentLike!]!

  # myComments(after: String): [ID!]!
  # myPosts(afterId: String): [Post!]!
  myFollows: [Follow!]!
  myCommits(after: String): [ID!]!
  myCommitReviews(after: String): [CommitReview!]!
  # myWaitedCommitReviews: [CommitReview!]!

  tagHints(term: String): [String!]!
  tickerHints(term: String): [String!]!
  eventHints(term: String): [String!]!

  # fetchPage(url: String!): Page!

  # myBets: [Bet!]!
  # myNotices: [Notice!]!
  # mySignals: [Signal]
  # groups: [Group]
  # myGroups: [Group]
  # groupPosts(groupId: ID): [Post]
}

type Mutation {
  createMycard(symbolName: String!, data: [CommentInput!]!): Selfcard!
  createOcard(symbolName: String!, oauthorName: String!, data: [CommentInput!]!): Ocard!
  # createOrGetCocard(url: String, data: [CommentInput!]!): Ocard!

  createComments(cardId: ID!, cardType: String!,  data: [CommentInput!]!): [Comment!]!
  # updateComment(id: ID!, data: CommentInput!): Comment!
  createComment(cardId: ID!, cardType: String!,  data: CommentInput!): Comment!

  createReply(commentId: ID!, data: ReplyInput!): Reply!
  # updateComment(id: ID!, data: CommentInput!): Comment!

  createVote(pollId: ID!, choiceIdx: Int!): Vote!

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

# type CommentWithSpotReplies {
#   id: ID!
#   userId: ID!
#   symbols: [Symbol!]
#   spotReplies: [Reply!]!
#   # cat: CommentCat!
#   isSpot: Boolean
#   text: String
#   count: CommentCount!
#   createdAt: DateTime!
#   # updatedAt: DateTime!
#   poll: Poll
# }

type Tick {
  id: ID!
  symbolId: ID!
  value: Float!
  at: DateTime!
}

type Link {
  id: ID!
  url: String!
  domain: String!
  contentType: String!
  contentId: String
  oauthorName: String
}

# type BlockBody {
#   blocks: [Block!]
#   text: String
#   ticks: [Tick!]
#   table: [Int!]
#   chart: [Int!]
#   json: String
#   # json不應該在正常情況下作為傳輸，但考慮到可能會有許多不確定的資料(chart, table)
# }

type corrTicker {
  ticker: String
  corr: Float
  createdAt: DateTime
}

# type PageProps {
#   selfSymbol: String
#   tickers: Comment
#   topics: Comment

#   # for ticker
#   links: Comment
#   pros: Comment
#   cons: Comment
#   act: Comment

#   # for topic, ticker
#   wiki: String
#   intro: Comment
#   shortView: Comment
#   longView: Comment
#   # type: Comment

#   # for webpage
#   srcAuthor: String
#   srcTitle: String

#   # status poll
#   voteCreate: Comment
#   # reportDuplicate: Comment

#   # for homepage -> 直接用query寫（為了靈活調度）
#   # focusPolls: [Comment!]
#   # trendTopics: [String!]
#   # newTopics: [String!]

#   # @deprecated
#   # name: String
#   # longName: String
#   # path: String
#   # canComment: Boolean
#   # canOpenAsPage: Boolean
#   # commentIntro: Comment
#   # commentSymbols: Comment
# }

# type Page {
#   id: ID!
#   # 取代path，也代表selfSymbol(若適用的話)
#   title: String!
#   template: String!
#   props: PageProps!
#   # body: BlockBody!
#   # topComments可以從comments中filter出來
#   comments: [Comment!]
#   link: Link
# }

type CardMeta {
  tickers: [String!]
  topics: [String!]
  links: [String!]
}

type Cocard {
  id: ID!
  template: CardTemplate!
  # meta: CardMeta!
  comments: [Comment!]!
  link: Link!
}

type Ocard {
  id: ID!
  template: CardTemplate!
  comments: [Comment!]!
  symbol: Symbol!
  oauthorName: String!
}

type Selfcard {
  id: ID!
  template: CardTemplate!
  comments: [Comment!]!
  symbol: Symbol!
  # user: User!
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

# --- NEXT ---

type Post {
  id: ID!
  userId: ID!
  cat: PostCat!
  status: PostStatus!
  text: String!
  symbols: [Symbol!]
  # count: PostCount!
  createdAt: DateTime
  updatedAt: DateTime
  votes: [Vote!]!
  # voteCommits: [VoteCommit!]!
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
  WEBPAGE
}

scalar DateTime
`