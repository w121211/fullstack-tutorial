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

export interface latestPosts_latestPosts_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface latestPosts_latestPosts_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface latestPosts_latestPosts_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface latestPosts_latestPosts_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface latestPosts_latestPosts {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: latestPosts_latestPosts_contentPoll | null;
  contentLink: latestPosts_latestPosts_contentLink | null;
  updatedAt: any | null;
  symbols: latestPosts_latestPosts_symbols[];
  count: latestPosts_latestPosts_count;
}

export interface latestPosts {
  latestPosts: latestPosts_latestPosts[];
}

export interface latestPostsVariables {
  after?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: post
// ====================================================

export interface post_post_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface post_post_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface post_post_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface post_post_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface post_post {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: post_post_contentPoll | null;
  contentLink: post_post_contentLink | null;
  updatedAt: any | null;
  symbols: post_post_symbols[];
  count: post_post_count;
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

export interface comments_comments {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
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
// GraphQL query operation: myPostVotes
// ====================================================

export interface myPostVotes_myPostVotes {
  __typename: "PostVote";
  id: string;
  postId: string;
  choice: number;
}

export interface myPostVotes {
  myPostVotes: myPostVotes_myPostVotes[];
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
  content: string | null;
  sysContent: string | null;
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

export interface commit_commit_post_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface commit_commit_post_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface commit_commit_post_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface commit_commit_post_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface commit_commit_post {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: commit_commit_post_contentPoll | null;
  contentLink: commit_commit_post_contentLink | null;
  updatedAt: any | null;
  symbols: commit_commit_post_symbols[];
  count: commit_commit_post_count;
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
  content: string | null;
  sysContent: string | null;
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

export interface createPost_createPost_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface createPost_createPost_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface createPost_createPost_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface createPost_createPost_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface createPost_createPost {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: createPost_createPost_contentPoll | null;
  contentLink: createPost_createPost_contentLink | null;
  updatedAt: any | null;
  symbols: createPost_createPost_symbols[];
  count: createPost_createPost_count;
}

export interface createPost {
  createPost: createPost_createPost;
}

export interface createPostVariables {
  data: PostInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePost
// ====================================================

export interface updatePost_updatePost_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface updatePost_updatePost_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface updatePost_updatePost_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface updatePost_updatePost_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface updatePost_updatePost {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: updatePost_updatePost_contentPoll | null;
  contentLink: updatePost_updatePost_contentLink | null;
  updatedAt: any | null;
  symbols: updatePost_updatePost_symbols[];
  count: updatePost_updatePost_count;
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
// GraphQL mutation operation: createPostVote
// ====================================================

export interface createPostVote_createPostVote {
  __typename: "PostVote";
  id: string;
  postId: string;
  choice: number;
}

export interface createPostVote {
  createPostVote: createPostVote_createPostVote;
}

export interface createPostVoteVariables {
  postId: string;
  data: PostVoteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePostVote
// ====================================================

export interface updatePostVote_updatePostVote {
  __typename: "PostVote";
  id: string;
  postId: string;
  choice: number;
}

export interface updatePostVote {
  updatePostVote: updatePostVote_updatePostVote;
}

export interface updatePostVoteVariables {
  postId: string;
  data: PostVoteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
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

export interface updateComment_updateComment {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
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

export interface createCommentLike_createCommentLike {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
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

export interface updateCommentLike_updateCommentLike {
  __typename: "CommentLike";
  id: string;
  commentId: string;
  choice: LikeChoice;
  updatedAt: any;
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

export interface postFragment_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface postFragment_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface postFragment_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface postFragment_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface postFragment {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: postFragment_contentPoll | null;
  contentLink: postFragment_contentLink | null;
  updatedAt: any | null;
  symbols: postFragment_symbols[];
  count: postFragment_count;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: postVote
// ====================================================

export interface postVote {
  __typename: "PostVote";
  id: string;
  postId: string;
  choice: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: comment
// ====================================================

export interface comment {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
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
  content: string | null;
  sysContent: string | null;
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

export interface commitDetail_post_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface commitDetail_post_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface commitDetail_post_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface commitDetail_post_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface commitDetail_post {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: commitDetail_post_contentPoll | null;
  contentLink: commitDetail_post_contentLink | null;
  updatedAt: any | null;
  symbols: commitDetail_post_symbols[];
  count: commitDetail_post_count;
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

export enum PostCat {
  ASK = "ASK",
  COMMIT = "COMMIT",
  IDEA = "IDEA",
  LINK = "LINK",
  POLL = "POLL",
}

export enum PostStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
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

export interface PostInput {
  cat: PostCat;
  status?: PostStatus | null;
  title?: string | null;
  contentText?: string | null;
  contentPoll?: PostPollInput | null;
  contentLink?: PostLinkInput | null;
  symbolIds: string[];
}

export interface PostLinkInput {
  url: string;
}

export interface PostPollInput {
  start: any;
  end: any;
  choices: string[];
}

export interface PostVoteInput {
  choice: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
