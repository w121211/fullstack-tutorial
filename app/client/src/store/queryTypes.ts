/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: newFeed
// ====================================================

export interface newFeed_newFeed_symbols {
  __typename: "Symbol";
  id: string;
  slug: string;
}

export interface newFeed_newFeed_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface newFeed_newFeed_meLike {
  __typename: "PostLike";
  postId: string;
  choice: number;
  updatedAt: any;
}

export interface newFeed_newFeed {
  __typename: "Post";
  id: string;
  view: View;
  title: string | null;
  content: string | null;
  updatedAt: any | null;
  symbols: newFeed_newFeed_symbols[];
  count: newFeed_newFeed_count;
  meLike: newFeed_newFeed_meLike | null;
}

export interface newFeed {
  newFeed: newFeed_newFeed[];
}

export interface newFeedVariables {
  after?: string | null;
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
  slug: string;
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

export interface post_post_meLike {
  __typename: "PostLike";
  postId: string;
  choice: number;
  updatedAt: any;
}

export interface post_post {
  __typename: "Post";
  id: string;
  view: View;
  title: string | null;
  content: string | null;
  updatedAt: any | null;
  symbols: post_post_symbols[];
  count: post_post_count;
  meLike: post_post_meLike | null;
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
  view: View;
  content: string | null;
  updatedAt: any;
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
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me {
  __typename: "User";
  id: string;
}

export interface GetMe {
  me: GetMe_me;
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
// GraphQL mutation operation: fetchPage
// ====================================================

export interface fetchPage_fetchPage_post {
  __typename: "Post";
  id: string;
  title: string | null;
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
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost_symbols {
  __typename: "Symbol";
  id: string;
  slug: string;
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

export interface createPost_createPost_meLike {
  __typename: "PostLike";
  postId: string;
  choice: number;
  updatedAt: any;
}

export interface createPost_createPost {
  __typename: "Post";
  id: string;
  view: View;
  title: string | null;
  content: string | null;
  updatedAt: any | null;
  symbols: createPost_createPost_symbols[];
  count: createPost_createPost_count;
  meLike: createPost_createPost_meLike | null;
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

export interface updatePost_updatePost_symbols {
  __typename: "Symbol";
  id: string;
  slug: string;
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

export interface updatePost_updatePost_meLike {
  __typename: "PostLike";
  postId: string;
  choice: number;
  updatedAt: any;
}

export interface updatePost_updatePost {
  __typename: "Post";
  id: string;
  view: View;
  title: string | null;
  content: string | null;
  updatedAt: any | null;
  symbols: updatePost_updatePost_symbols[];
  count: updatePost_updatePost_count;
  meLike: updatePost_updatePost_meLike | null;
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
  data: LikeInput;
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
  data: LikeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment_meLike {
  __typename: "CommentLike";
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface CreateComment_createComment {
  __typename: "Comment";
  id: string;
  view: View;
  content: string | null;
  updatedAt: any;
  meLike: CreateComment_createComment_meLike | null;
}

export interface CreateComment {
  createComment: CreateComment_createComment;
}

export interface CreateCommentVariables {
  data: CommentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateComment
// ====================================================

export interface UpdateComment_updateComment_meLike {
  __typename: "CommentLike";
  commentId: string;
  choice: number;
  updatedAt: any;
}

export interface UpdateComment_updateComment {
  __typename: "Comment";
  id: string;
  view: View;
  content: string | null;
  updatedAt: any;
  meLike: UpdateComment_updateComment_meLike | null;
}

export interface UpdateComment {
  updateComment: UpdateComment_updateComment;
}

export interface UpdateCommentVariables {
  id: string;
  data: CommentInput;
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
// GraphQL fragment: post
// ====================================================

export interface post_symbols {
  __typename: "Symbol";
  id: string;
  slug: string;
}

export interface post_count {
  __typename: "PostCount";
  id: string;
  nViews: number;
  nUps: number;
  nDowns: number;
  nComments: number;
  updatedAt: any;
}

export interface post_meLike {
  __typename: "PostLike";
  postId: string;
  choice: number;
  updatedAt: any;
}

export interface post {
  __typename: "Post";
  id: string;
  view: View;
  title: string | null;
  content: string | null;
  updatedAt: any | null;
  symbols: post_symbols[];
  count: post_count;
  meLike: post_meLike | null;
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
  view: View;
  content: string | null;
  updatedAt: any;
  meLike: comment_meLike | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum View {
  DELETED = "DELETED",
  LOCKED = "LOCKED",
  PUBLIC = "PUBLIC",
  REPORTED = "REPORTED",
}

export interface CommentInput {
  view?: View | null;
  content: string;
}

export interface LikeInput {
  choice: number;
}

export interface PostInput {
  view?: View | null;
  title?: string | null;
  content?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
