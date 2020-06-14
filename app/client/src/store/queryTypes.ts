/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsUserLoggedIn
// ====================================================

export interface IsUserLoggedIn {
  isLoggedIn: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me {
  __typename: "User";
  id: string;
}

export interface me {
  me: me_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: latestPosts
// ====================================================

export interface latestPosts_latestPosts_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface latestPosts_latestPosts_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface latestPosts_latestPosts_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface latestPosts_latestPosts_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: latestPosts_latestPosts_poll_count | null;
}

export interface latestPosts_latestPosts_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface latestPosts_latestPosts_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface latestPosts_latestPosts {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: latestPosts_latestPosts_symbols[] | null;
  count: latestPosts_latestPosts_count;
  poll: latestPosts_latestPosts_poll | null;
  parent: latestPosts_latestPosts_parent | null;
  children: (latestPosts_latestPosts_children | null)[] | null;
}

export interface latestPosts {
  latestPosts: latestPosts_latestPosts[];
}

export interface latestPostsVariables {
  symbolId?: string | null;
  afterId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: repliedPosts
// ====================================================

export interface repliedPosts_repliedPosts_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface repliedPosts_repliedPosts_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface repliedPosts_repliedPosts_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface repliedPosts_repliedPosts_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: repliedPosts_repliedPosts_poll_count | null;
}

export interface repliedPosts_repliedPosts_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface repliedPosts_repliedPosts_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface repliedPosts_repliedPosts {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: repliedPosts_repliedPosts_symbols[] | null;
  count: repliedPosts_repliedPosts_count;
  poll: repliedPosts_repliedPosts_poll | null;
  parent: repliedPosts_repliedPosts_parent | null;
  children: (repliedPosts_repliedPosts_children | null)[] | null;
}

export interface repliedPosts {
  repliedPosts: repliedPosts_repliedPosts[];
}

export interface repliedPostsVariables {
  parentId: string;
  afterId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: post
// ====================================================

export interface post_post_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface post_post_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface post_post_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface post_post_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: post_post_poll_count | null;
}

export interface post_post_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface post_post_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface post_post {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: post_post_symbols[] | null;
  count: post_post_count;
  poll: post_post_poll | null;
  parent: post_post_parent | null;
  children: (post_post_children | null)[] | null;
}

export interface post {
  post: post_post;
}

export interface postVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: comments
// ====================================================

export interface comments_comments_count {
  __typename: "CommentCount";
  id: string;
  nUps: number;
  nDowns: number;
}

export interface comments_comments {
  __typename: "Comment";
  id: string;
  userId: string;
  content: string | null;
  updatedAt: any;
  count: comments_comments_count;
}

export interface comments {
  comments: comments_comments[];
}

export interface commentsVariables {
  postId: string;
  after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPostLikes
// ====================================================

export interface myPostLikes_myPostLikes {
  __typename: "PostLike";
  id: string;
  postId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface myPostLikes {
  myPostLikes: myPostLikes_myPostLikes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPollVotes
// ====================================================

export interface myPollVotes_myPollVotes {
  __typename: "PollVote";
  id: string;
  pollId: string;
  choice: number;
}

export interface myPollVotes {
  myPollVotes: myPollVotes_myPollVotes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myCommentLikes
// ====================================================

export interface myCommentLikes_myCommentLikes {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface myCommentLikes {
  myCommentLikes: myCommentLikes_myCommentLikes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSymbol
// ====================================================

export interface getSymbol_symbol {
  __typename: "Symbol";
  id: string;
  name: string;
  cat: SymbolCat;
  status: SymbolStatus;
  body: string | null;
  sys: string | null;
}

export interface getSymbol {
  symbol: getSymbol_symbol;
}

export interface getSymbolVariables {
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: commits
// ====================================================

export interface commits_commits {
  __typename: "Commit";
  id: string;
  symbolId: string;
  status: CommitStatus;
  action: CommitAction;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface commits {
  commits: commits_commits[];
}

export interface commitsVariables {
  symbolId: string;
  after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: commit
// ====================================================

export interface commit_commit_post_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface commit_commit_post_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface commit_commit_post_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface commit_commit_post_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: commit_commit_post_poll_count | null;
}

export interface commit_commit_post_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface commit_commit_post_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface commit_commit_post {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: commit_commit_post_symbols[] | null;
  count: commit_commit_post_count;
  poll: commit_commit_post_poll | null;
  parent: commit_commit_post_parent | null;
  children: (commit_commit_post_children | null)[] | null;
}

export interface commit_commit_reviews {
  __typename: "CommitReview";
  id: string;
  userId: string;
  choice: number;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface commit_commit {
  __typename: "Commit";
  id: string;
  symbolId: string;
  status: CommitStatus;
  action: CommitAction;
  content: string;
  post: commit_commit_post;
  reviews: commit_commit_reviews[];
  createdAt: any | null;
  updatedAt: any | null;
}

export interface commit {
  commit: commit_commit;
}

export interface commitVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myFollows
// ====================================================

export interface myFollows_myFollows {
  __typename: "Follow";
  id: string;
  symbolId: string;
  followed: boolean;
  updatedAt: any;
}

export interface myFollows {
  myFollows: myFollows_myFollows[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchPage
// ====================================================

export interface fetchPage_fetchPage_createdEvent {
  __typename: "Symbol";
  id: string;
  name: string;
  cat: SymbolCat;
  status: SymbolStatus;
  body: string | null;
  sys: string | null;
}

export interface fetchPage_fetchPage {
  __typename: "Page";
  id: string;
  createdPostId: string | null;
  suggestTitle: string | null;
  suggestTags: string[];
  suggestEvents: string[];
  suggestTickers: string[];
  createdEvent: fetchPage_fetchPage_createdEvent | null;
}

export interface fetchPage {
  fetchPage: fetchPage_fetchPage;
}

export interface fetchPageVariables {
  url: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_user {
  __typename: "User";
  id: string;
}

export interface signup_signup {
  __typename: "AuthPayload";
  token: string;
  user: signup_signup_user;
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user {
  __typename: "User";
  id: string;
}

export interface login_login {
  __typename: "AuthPayload";
  token: string;
  user: login_login_user;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface createPost_createPost_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface createPost_createPost_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface createPost_createPost_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: createPost_createPost_poll_count | null;
}

export interface createPost_createPost_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface createPost_createPost_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface createPost_createPost {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: createPost_createPost_symbols[] | null;
  count: createPost_createPost_count;
  poll: createPost_createPost_poll | null;
  parent: createPost_createPost_parent | null;
  children: (createPost_createPost_children | null)[] | null;
}

export interface createPost {
  createPost: createPost_createPost;
}

export interface createPostVariables {
  data: PostInput;
  parentId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePost
// ====================================================

export interface updatePost_updatePost_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface updatePost_updatePost_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface updatePost_updatePost_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface updatePost_updatePost_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: updatePost_updatePost_poll_count | null;
}

export interface updatePost_updatePost_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface updatePost_updatePost_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface updatePost_updatePost {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: updatePost_updatePost_symbols[] | null;
  count: updatePost_updatePost_count;
  poll: updatePost_updatePost_poll | null;
  parent: updatePost_updatePost_parent | null;
  children: (updatePost_updatePost_children | null)[] | null;
}

export interface updatePost {
  updatePost: updatePost_updatePost;
}

export interface updatePostVariables {
  id: string;
  data: PostInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPostLike
// ====================================================

export interface createPostLike_createPostLike_like {
  __typename: "PostLike";
  id: string;
  postId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface createPostLike_createPostLike_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface createPostLike_createPostLike {
  __typename: "PostLikeResonse";
  like: createPostLike_createPostLike_like;
  count: createPostLike_createPostLike_count;
}

export interface createPostLike {
  createPostLike: createPostLike_createPostLike;
}

export interface createPostLikeVariables {
  postId: string;
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePostLike
// ====================================================

export interface updatePostLike_updatePostLike_like {
  __typename: "PostLike";
  id: string;
  postId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface updatePostLike_updatePostLike_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface updatePostLike_updatePostLike {
  __typename: "PostLikeResonse";
  like: updatePostLike_updatePostLike_like;
  count: updatePostLike_updatePostLike_count;
}

export interface updatePostLike {
  updatePostLike: updatePostLike_updatePostLike;
}

export interface updatePostLikeVariables {
  id: string;
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPollVote
// ====================================================

export interface createPollVote_createPollVote {
  __typename: "PollVote";
  id: string;
  pollId: string;
  choice: number;
}

export interface createPollVote {
  createPollVote: createPollVote_createPollVote;
}

export interface createPollVoteVariables {
  pollId: string;
  data: PollVoteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment_count {
  __typename: "CommentCount";
  id: string;
  nUps: number;
  nDowns: number;
}

export interface createComment_createComment {
  __typename: "Comment";
  id: string;
  userId: string;
  content: string | null;
  updatedAt: any;
  count: createComment_createComment_count;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  postId: string;
  data: CommentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateComment
// ====================================================

export interface updateComment_updateComment_count {
  __typename: "CommentCount";
  id: string;
  nUps: number;
  nDowns: number;
}

export interface updateComment_updateComment {
  __typename: "Comment";
  id: string;
  userId: string;
  content: string | null;
  updatedAt: any;
  count: updateComment_updateComment_count;
}

export interface updateComment {
  updateComment: updateComment_updateComment;
}

export interface updateCommentVariables {
  id: string;
  data: CommentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCommentLike
// ====================================================

export interface createCommentLike_createCommentLike_like {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface createCommentLike_createCommentLike_count {
  __typename: "CommentCount";
  id: string;
  nUps: number;
  nDowns: number;
}

export interface createCommentLike_createCommentLike {
  __typename: "CommentLikeResonse";
  like: createCommentLike_createCommentLike_like;
  count: createCommentLike_createCommentLike_count;
}

export interface createCommentLike {
  createCommentLike: createCommentLike_createCommentLike;
}

export interface createCommentLikeVariables {
  commentId: string;
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCommentLike
// ====================================================

export interface updateCommentLike_updateCommentLike_like {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

export interface updateCommentLike_updateCommentLike_count {
  __typename: "CommentCount";
  id: string;
  nUps: number;
  nDowns: number;
}

export interface updateCommentLike_updateCommentLike {
  __typename: "CommentLikeResonse";
  like: updateCommentLike_updateCommentLike_like;
  count: updateCommentLike_updateCommentLike_count;
}

export interface updateCommentLike {
  updateCommentLike: updateCommentLike_updateCommentLike;
}

export interface updateCommentLikeVariables {
  id: string;
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createFollow
// ====================================================

export interface createFollow_createFollow {
  __typename: "Follow";
  id: string;
  symbolId: string;
  followed: boolean;
  updatedAt: any;
}

export interface createFollow {
  createFollow: createFollow_createFollow;
}

export interface createFollowVariables {
  symbolId: string;
  data: FollowInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateFollow
// ====================================================

export interface updateFollow_updateFollow {
  __typename: "Follow";
  id: string;
  symbolId: string;
  followed: boolean;
  updatedAt: any;
}

export interface updateFollow {
  updateFollow: updateFollow_updateFollow;
}

export interface updateFollowVariables {
  symbolId: string;
  data: FollowInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCommit
// ====================================================

export interface createCommit_createCommit {
  __typename: "Commit";
  id: string;
  symbolId: string;
  status: CommitStatus;
  action: CommitAction;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface createCommit {
  createCommit: createCommit_createCommit;
}

export interface createCommitVariables {
  data: CommitInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCommit
// ====================================================

export interface updateCommit_updateCommit {
  __typename: "Commit";
  id: string;
  symbolId: string;
  status: CommitStatus;
  action: CommitAction;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface updateCommit {
  updateCommit: updateCommit_updateCommit;
}

export interface updateCommitVariables {
  id: string;
  data: CommitInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: applyCommitReview
// ====================================================

export interface applyCommitReview_applyCommitReview {
  __typename: "CommitReview";
  id: string;
  userId: string;
  choice: number;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface applyCommitReview {
  applyCommitReview: applyCommitReview_applyCommitReview;
}

export interface applyCommitReviewVariables {
  commitId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCommitReview
// ====================================================

export interface updateCommitReview_updateCommitReview {
  __typename: "CommitReview";
  id: string;
  userId: string;
  choice: number;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface updateCommitReview {
  updateCommitReview: updateCommitReview_updateCommitReview;
}

export interface updateCommitReviewVariables {
  id: string;
  data: CommitReviewInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: postLike
// ====================================================

export interface postLike {
  __typename: "PostLike";
  id: string;
  postId: string;
  choice: LikeChoice;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: postCount
// ====================================================

export interface postCount {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: postFragment
// ====================================================

export interface postFragment_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface postFragment_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface postFragment_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface postFragment_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: postFragment_poll_count | null;
}

export interface postFragment_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface postFragment_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface postFragment {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: postFragment_symbols[] | null;
  count: postFragment_count;
  poll: postFragment_poll | null;
  parent: postFragment_parent | null;
  children: (postFragment_children | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: pollVote
// ====================================================

export interface pollVote {
  __typename: "PollVote";
  id: string;
  pollId: string;
  choice: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commentCount
// ====================================================

export interface commentCount {
  __typename: "CommentCount";
  id: string;
  nUps: number;
  nDowns: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: comment
// ====================================================

export interface comment_count {
  __typename: "CommentCount";
  id: string;
  nUps: number;
  nDowns: number;
}

export interface comment {
  __typename: "Comment";
  id: string;
  userId: string;
  content: string | null;
  updatedAt: any;
  count: comment_count;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commentLike
// ====================================================

export interface commentLike {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: symbolFragment
// ====================================================

export interface symbolFragment {
  __typename: "Symbol";
  id: string;
  name: string;
  cat: SymbolCat;
  status: SymbolStatus;
  body: string | null;
  sys: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commitReview
// ====================================================

export interface commitReview {
  __typename: "CommitReview";
  id: string;
  userId: string;
  choice: number;
  createdAt: any | null;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commitDetail
// ====================================================

export interface commitDetail_post_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface commitDetail_post_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface commitDetail_post_poll_count {
  __typename: "PollCount";
  nVotes: number[];
  nJudgements: (number | null)[] | null;
  judgeStartedAt: any | null;
  judgeEndedAt: any | null;
  verdictValid: boolean | null;
  verdictChoice: number | null;
}

export interface commitDetail_post_poll {
  __typename: "Poll";
  id: string;
  status: PollStatus;
  start: any;
  end: any;
  choices: string[];
  nDays: number;
  minVotes: number;
  nDaysJudge: number;
  minJudgments: number;
  count: commitDetail_post_poll_count | null;
}

export interface commitDetail_post_parent {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface commitDetail_post_children {
  __typename: "PostPeek";
  id: string;
  cat: PostCat | null;
  title: string | null;
}

export interface commitDetail_post {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string;
  text: string;
  createdAt: any | null;
  updatedAt: any | null;
  symbols: commitDetail_post_symbols[] | null;
  count: commitDetail_post_count;
  poll: commitDetail_post_poll | null;
  parent: commitDetail_post_parent | null;
  children: (commitDetail_post_children | null)[] | null;
}

export interface commitDetail_reviews {
  __typename: "CommitReview";
  id: string;
  userId: string;
  choice: number;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface commitDetail {
  __typename: "Commit";
  id: string;
  symbolId: string;
  status: CommitStatus;
  action: CommitAction;
  content: string;
  post: commitDetail_post;
  reviews: commitDetail_reviews[];
  createdAt: any | null;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: commitTile
// ====================================================

export interface commitTile {
  __typename: "Commit";
  id: string;
  symbolId: string;
  status: CommitStatus;
  action: CommitAction;
  createdAt: any | null;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: follow
// ====================================================

export interface follow {
  __typename: "Follow";
  id: string;
  symbolId: string;
  followed: boolean;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CommitAction {
  CREATE = "CREATE",
  DELETE = "DELETE",
  MERGE = "MERGE",
  UPDATE = "UPDATE",
}

export enum CommitStatus {
  PASS = "PASS",
  REJECT = "REJECT",
  REVIEW = "REVIEW",
}

export enum LikeChoice {
  DOWN = "DOWN",
  NEUTRAL = "NEUTRAL",
  UP = "UP",
}

export enum PollStatus {
  CLOSE_FAIL = "CLOSE_FAIL",
  CLOSE_SUCCESS = "CLOSE_SUCCESS",
  JUDGE = "JUDGE",
  OPEN = "OPEN",
}

export enum PostCat {
  ASK = "ASK",
  COMMIT = "COMMIT",
  IDEA = "IDEA",
  LINK = "LINK",
  POLL = "POLL",
  REPLY = "REPLY",
}

export enum PostStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
  LOCK = "LOCK",
  REPORTED = "REPORTED",
}

export enum SymbolCat {
  EVENT = "EVENT",
  SYS_TICKER_FOLLOWERS = "SYS_TICKER_FOLLOWERS",
  TAG = "TAG",
  TICKER = "TICKER",
}

export enum SymbolStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DUPLICATED = "DUPLICATED",
  REPORTED = "REPORTED",
}

export interface CommentInput {
  status?: PostStatus | null;
  content: string;
}

export interface CommitInput {
  symbolId?: string | null;
  action: CommitAction;
  content: string;
}

export interface CommitReviewInput {
  choice: number;
}

export interface FollowInput {
  symbolId: string;
  followed: boolean;
}

export interface LikeInput {
  choice: LikeChoice;
}

export interface PollInput {
  choices: string[];
  nDays: number;
}

export interface PollVoteInput {
  choice: number;
}

export interface PostInput {
  cat: PostCat;
  status?: PostStatus | null;
  title?: string | null;
  symbolIds: string[];
  text?: string | null;
  poll?: PollInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
