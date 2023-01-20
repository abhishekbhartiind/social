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

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['ID'];
  content: Scalars['String'];
  id: Scalars['ID'];
  postId: Scalars['ID'];
  replies: Array<Comment>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentPost: Scalars['Boolean'];
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editComment?: Maybe<Comment>;
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

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  creatorId: Scalars['ID'];
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  likeCount: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  replies: Array<Comment>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryRepliesArgs = {
  parentCommentId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  posts: Array<Post>;
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<CommentEntity>;
  FieldError: ResolverTypeWrapper<FieldError>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedPosts: ResolverTypeWrapper<Omit<PaginatedPosts, 'posts'> & { posts: Array<ResolversTypes['Post']> }>;
  Post: ResolverTypeWrapper<PostEntity>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<UserEntity>;
  UserResponse: ResolverTypeWrapper<Omit<UserResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  UsernamePasswordInput: UsernamePasswordInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Comment: CommentEntity;
  FieldError: FieldError;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PaginatedPosts: Omit<PaginatedPosts, 'posts'> & { posts: Array<ResolversParentTypes['Post']> };
  Post: PostEntity;
  Query: {};
  String: Scalars['String'];
  User: UserEntity;
  UserResponse: Omit<UserResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  UsernamePasswordInput: UsernamePasswordInput;
}>;

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FieldErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = ResolversObject<{
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  commentPost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCommentPostArgs, 'content' | 'postId'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'text' | 'title'>>;
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId' | 'postId'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  editComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationEditCommentArgs, 'commentId' | 'content' | 'postId'>>;
  likePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'id'>>;
  login?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'options'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id' | 'text' | 'title'>>;
}>;

export type PaginatedPostsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PaginatedPosts'] = ResolversParentTypes['PaginatedPosts']> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PaginatedPosts'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'limit'>>;
  replies?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryRepliesArgs, 'parentCommentId'>>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['FieldError']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>;
  FieldError?: FieldErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedPosts?: PaginatedPostsResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
}>;

