import { GraphQLResolveInfo } from 'graphql';
import { UserEntity } from 'src/entities/user';
import { PostEntity } from 'src/entities/post';
import { CommentEntity } from 'src/entities/comment';
import { MyContext } from 'src/types/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BaseComment = Comment & {
  __typename?: 'BaseComment';
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  postId: Scalars['ID'];
  repliesCount: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type Comment = {
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  postId: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentPost: Comment;
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editComment?: Maybe<Comment>;
  likeComment: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationCommentPostArgs = {
  content: Scalars['String'];
  parentCommentId?: InputMaybe<Scalars['ID']>;
  postId: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['ID'];
  content: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationLikeCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type PaginatedArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type PaginatedBaseComments = PaginatedList & {
  __typename?: 'PaginatedBaseComments';
  data: Array<BaseComment>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedList = {
  hasMore: Scalars['Boolean'];
};

export type PaginatedPosts = PaginatedList & {
  __typename?: 'PaginatedPosts';
  data: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedReplies = PaginatedList & {
  __typename?: 'PaginatedReplies';
  data: Array<Reply>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['ID'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  baseComments: PaginatedBaseComments;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  replies: PaginatedReplies;
};


export type QueryBaseCommentsArgs = {
  options: PaginatedArgs;
  postId: Scalars['ID'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  options: PaginatedArgs;
};


export type QueryRepliesArgs = {
  options: PaginatedArgs;
  parentCommentId: Scalars['ID'];
};

export type Reply = Comment & {
  __typename?: 'Reply';
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  postId: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BaseComment: ResolverTypeWrapper<Omit<BaseComment, 'author'> & { author: ResolversTypes['User'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<CommentEntity>;
  FieldError: ResolverTypeWrapper<FieldError>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedArgs: PaginatedArgs;
  PaginatedBaseComments: ResolverTypeWrapper<Omit<PaginatedBaseComments, 'data'> & { data: Array<ResolversTypes['BaseComment']> }>;
  PaginatedList: ResolversTypes['PaginatedBaseComments'] | ResolversTypes['PaginatedPosts'] | ResolversTypes['PaginatedReplies'];
  PaginatedPosts: ResolverTypeWrapper<Omit<PaginatedPosts, 'data'> & { data: Array<ResolversTypes['Post']> }>;
  PaginatedReplies: ResolverTypeWrapper<Omit<PaginatedReplies, 'data'> & { data: Array<ResolversTypes['Reply']> }>;
  Post: ResolverTypeWrapper<PostEntity>;
  Query: ResolverTypeWrapper<{}>;
  Reply: ResolverTypeWrapper<Omit<Reply, 'author'> & { author: ResolversTypes['User'] }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<UserEntity>;
  UserResponse: ResolverTypeWrapper<Omit<UserResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  UsernamePasswordInput: UsernamePasswordInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BaseComment: Omit<BaseComment, 'author'> & { author: ResolversParentTypes['User'] };
  Boolean: Scalars['Boolean'];
  Comment: CommentEntity;
  FieldError: FieldError;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PaginatedArgs: PaginatedArgs;
  PaginatedBaseComments: Omit<PaginatedBaseComments, 'data'> & { data: Array<ResolversParentTypes['BaseComment']> };
  PaginatedList: ResolversParentTypes['PaginatedBaseComments'] | ResolversParentTypes['PaginatedPosts'] | ResolversParentTypes['PaginatedReplies'];
  PaginatedPosts: Omit<PaginatedPosts, 'data'> & { data: Array<ResolversParentTypes['Post']> };
  PaginatedReplies: Omit<PaginatedReplies, 'data'> & { data: Array<ResolversParentTypes['Reply']> };
  Post: PostEntity;
  Query: {};
  Reply: Omit<Reply, 'author'> & { author: ResolversParentTypes['User'] };
  String: Scalars['String'];
  User: UserEntity;
  UserResponse: Omit<UserResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  UsernamePasswordInput: UsernamePasswordInput;
}>;

export type BaseCommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BaseComment'] = ResolversParentTypes['BaseComment']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  repliesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseComment' | 'Reply', ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type FieldErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = ResolversObject<{
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  commentPost?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentPostArgs, 'content' | 'postId'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'text' | 'title'>>;
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId' | 'postId'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  editComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationEditCommentArgs, 'commentId' | 'content' | 'postId'>>;
  likeComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLikeCommentArgs, 'commentId'>>;
  likePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'id'>>;
  login?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'options'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id' | 'text' | 'title'>>;
}>;

export type PaginatedBaseCommentsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PaginatedBaseComments'] = ResolversParentTypes['PaginatedBaseComments']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['BaseComment']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedListResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PaginatedList'] = ResolversParentTypes['PaginatedList']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PaginatedBaseComments' | 'PaginatedPosts' | 'PaginatedReplies', ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type PaginatedPostsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PaginatedPosts'] = ResolversParentTypes['PaginatedPosts']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedRepliesResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PaginatedReplies'] = ResolversParentTypes['PaginatedReplies']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Reply']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  textSnippet?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  baseComments?: Resolver<ResolversTypes['PaginatedBaseComments'], ParentType, ContextType, RequireFields<QueryBaseCommentsArgs, 'options' | 'postId'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PaginatedPosts'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'options'>>;
  replies?: Resolver<ResolversTypes['PaginatedReplies'], ParentType, ContextType, RequireFields<QueryRepliesArgs, 'options' | 'parentCommentId'>>;
}>;

export type ReplyResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Reply'] = ResolversParentTypes['Reply']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['FieldError']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  BaseComment?: BaseCommentResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  FieldError?: FieldErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedBaseComments?: PaginatedBaseCommentsResolvers<ContextType>;
  PaginatedList?: PaginatedListResolvers<ContextType>;
  PaginatedPosts?: PaginatedPostsResolvers<ContextType>;
  PaginatedReplies?: PaginatedRepliesResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reply?: ReplyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
}>;

