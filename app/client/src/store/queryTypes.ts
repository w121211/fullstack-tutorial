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

export interface comments_comments_meLike {
  __typename: "CommentLike";
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface comments_comments {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
  meComment: boolean;
  meLike: comments_comments_meLike | null;
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
  postId: string;
  choice: number;
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
  commentId: string;
  choice: number;
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

export interface getSymbol_symbol_posts_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface getSymbol_symbol_posts_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface getSymbol_symbol_posts_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface getSymbol_symbol_posts_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface getSymbol_symbol_posts {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: getSymbol_symbol_posts_contentPoll | null;
  contentLink: getSymbol_symbol_posts_contentLink | null;
  updatedAt: any | null;
  symbols: getSymbol_symbol_posts_symbols[];
  count: getSymbol_symbol_posts_count;
}

export interface getSymbol_symbol {
  __typename: "Symbol";
  id: string;
  name: string;
  cat: SymbolCat;
  status: SymbolStatus;
  content: string | null;
  sysContent: string | null;
  posts: getSymbol_symbol_posts[];
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
// GraphQL query operation: fetchPage
// ====================================================

export interface fetchPage_fetchPage_post_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface fetchPage_fetchPage_post_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface fetchPage_fetchPage_post_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface fetchPage_fetchPage_post_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface fetchPage_fetchPage_post {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: fetchPage_fetchPage_post_contentPoll | null;
  contentLink: fetchPage_fetchPage_post_contentLink | null;
  updatedAt: any | null;
  symbols: fetchPage_fetchPage_post_symbols[];
  count: fetchPage_fetchPage_post_count;
}

export interface fetchPage_fetchPage {
  __typename: "Page";
  id: string;
  post: fetchPage_fetchPage_post | null;
  title: string | null;
  symbols: string[] | null;
  tags: string[] | null;
  events: string[] | null;
}

export interface fetchPage {
  fetchPage: fetchPage_fetchPage;
}

export interface fetchPageVariables {
  link: string;
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

export interface createPostLike_createPostLike {
  __typename: "PostLike";
  postId: string;
  choice: number;
  updatedAt: any;
}

export interface createPostLike {
  createPostLike: createPostLike_createPostLike;
}

export interface createPostLikeVariables {
  postId: string;
  data: PostLikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePostLike
// ====================================================

export interface updatePostLike_updatePostLike {
  __typename: "PostLike";
  postId: string;
  choice: number;
  updatedAt: any;
}

export interface updatePostLike {
  updatePostLike: updatePostLike_updatePostLike;
}

export interface updatePostLikeVariables {
  postId: string;
  data: PostLikeInput;
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

export interface createComment_createComment_meLike {
  __typename: "CommentLike";
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface createComment_createComment {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
  meComment: boolean;
  meLike: createComment_createComment_meLike | null;
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

export interface updateComment_updateComment_meLike {
  __typename: "CommentLike";
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface updateComment_updateComment {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
  meComment: boolean;
  meLike: updateComment_updateComment_meLike | null;
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
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface createCommentLike {
  createCommentLike: createCommentLike_createCommentLike;
}

export interface createCommentLikeVariables {
  commentId: string;
  data: CommentLikeInput;
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
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface updateCommentLike {
  updateCommentLike: updateCommentLike_updateCommentLike;
}

export interface updateCommentLikeVariables {
  commentId: string;
  data: CommentLikeInput;
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
  postId: string;
  choice: number;
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

export interface comment_meLike {
  __typename: "CommentLike";
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface comment {
  __typename: "Comment";
  id: string;
  content: string | null;
  updatedAt: any;
  meComment: boolean;
  meLike: comment_meLike | null;
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
  commentId: string;
  choice: number;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: symbolFragment
// ====================================================

export interface symbolFragment_posts_contentPoll {
  __typename: "PostPoll";
  start: any;
  end: any;
  choices: string[];
}

export interface symbolFragment_posts_contentLink {
  __typename: "PostLink";
  url: string;
}

export interface symbolFragment_posts_symbols {
  __typename: "Symbol";
  id: string;
  name: string;
}

export interface symbolFragment_posts_count {
  __typename: "PostCount";
  id: string;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface symbolFragment_posts {
  __typename: "Post";
  id: string;
  userId: string;
  cat: PostCat;
  status: PostStatus;
  title: string | null;
  contentText: string | null;
  contentPoll: symbolFragment_posts_contentPoll | null;
  contentLink: symbolFragment_posts_contentLink | null;
  updatedAt: any | null;
  symbols: symbolFragment_posts_symbols[];
  count: symbolFragment_posts_count;
}

export interface symbolFragment {
  __typename: "Symbol";
  id: string;
  name: string;
  cat: SymbolCat;
  status: SymbolStatus;
  content: string | null;
  sysContent: string | null;
  posts: symbolFragment_posts[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PostCat {
  COMMIT = "COMMIT",
  LINK = "LINK",
  POLL = "POLL",
  POST = "POST",
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

export interface CommentLikeInput {
  choice: number;
}

export interface PostInput {
  cat: PostCat;
  status?: PostStatus | null;
  title?: string | null;
  contentText?: string | null;
  contentPoll?: PostPollInput | null;
  contentLink?: PostLinkInput | null;
  symbols: string[];
}

export interface PostLikeInput {
  choice: number;
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
