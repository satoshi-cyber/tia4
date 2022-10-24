import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Answer = {
  __typename?: 'Answer';
  downloadUrl?: Maybe<Scalars['String']>;
  question: Question;
  uploadUrl?: Maybe<Scalars['String']>;
};

export type AnswerInput = {
  question: QuestionInput;
};

export type Interview = {
  __typename?: 'Interview';
  answers: Array<Answer>;
  id: Scalars['ID'];
  jobId: Scalars['String'];
};

export type Job = {
  __typename?: 'Job';
  deadline: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  questions: Array<Question>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJob: Job;
  createUser: User;
  deleteInterview?: Maybe<Interview>;
  deleteJob?: Maybe<Job>;
  deleteUser: User;
  submitInterview: Interview;
  updateInterview: Interview;
  updateJob: Job;
  updateUser: User;
};


export type MutationCreateJobArgs = {
  input?: InputMaybe<NewJob>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<NewUser>;
};


export type MutationDeleteInterviewArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteJobArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationSubmitInterviewArgs = {
  input?: InputMaybe<NewInterview>;
};


export type MutationUpdateInterviewArgs = {
  input?: InputMaybe<UpdateInterview>;
};


export type MutationUpdateJobArgs = {
  input?: InputMaybe<UpdateJob>;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUser>;
};

export type NewInterview = {
  answers: Array<AnswerInput>;
  jobId: Scalars['String'];
  userId: Scalars['String'];
};

export type NewJob = {
  deadline: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  questions: Array<QuestionInput>;
  title: Scalars['String'];
};

export type NewUser = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  interviews: Array<Interview>;
  jobs: Array<Job>;
  users: Array<User>;
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID'];
  question: Scalars['String'];
  time: Scalars['Int'];
};

export type QuestionInput = {
  id: Scalars['ID'];
  question: Scalars['String'];
  time: Scalars['Int'];
};

export type UpdateInterview = {
  answers: Array<AnswerInput>;
  id: Scalars['ID'];
  jobId: Scalars['String'];
};

export type UpdateJob = {
  deadline?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  questions?: InputMaybe<Array<QuestionInput>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUser = {
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type CreateJobMutationVariables = Exact<{
  input?: InputMaybe<NewJob>;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Job', id: string } };

export type JobsListQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsListQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, title: string, deadline: any }> };


export const CreateJobDocument = gql`
    mutation CreateJob($input: NewJob) {
  createJob(input: $input) {
    id
  }
}
    `;

export function useCreateJobMutation() {
  return Urql.useMutation<CreateJobMutation, CreateJobMutationVariables>(CreateJobDocument);
};
export const JobsListDocument = gql`
    query JobsList {
  jobs {
    id
    title
    deadline
  }
}
    `;

export function useJobsListQuery(options?: Omit<Urql.UseQueryArgs<JobsListQueryVariables>, 'query'>) {
  return Urql.useQuery<JobsListQuery, JobsListQueryVariables>({ query: JobsListDocument, ...options });
};