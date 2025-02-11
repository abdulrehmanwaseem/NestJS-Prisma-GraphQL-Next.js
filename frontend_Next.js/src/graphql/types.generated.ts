export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  role?: Maybe<Role>;
  userId: Scalars['String']['output'];
};

export type CreatePostInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deleteUser: Scalars['Boolean']['output'];
  enable2FA: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
  promoteUserToAdmin: Scalars['Boolean']['output'];
  removePost: Post;
  signIn: SignInResponse;
  signUp: AuthPayload;
  updatePost: Post;
  updateUser: User;
  verify2FALogin: AuthPayload;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationPromoteUserToAdminArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: CreateUserInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationVerify2FaLoginArgs = {
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  user: User;
};

export type Profile = {
  __typename?: 'Profile';
  avatar: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String']['output'];
  getProfile: User;
  getUser: User;
  getUsers: Array<User>;
  post: Post;
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  requires2FA?: Maybe<Scalars['Boolean']['output']>;
  role?: Maybe<Role>;
  userId: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
};

export type UpdatePostInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isTwoFAEnabled: Scalars['Boolean']['output'];
  posts: Array<Post>;
  profile?: Maybe<Profile>;
  role: Role;
  username: Scalars['String']['output'];
};

export type SignUpMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthPayload', userId: string, role?: Role | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', email: string, username: string }> };
