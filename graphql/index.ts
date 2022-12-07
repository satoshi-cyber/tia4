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
  question: Question;
  thumbnail: Scalars['String'];
  thumbnailUploadUrl: Scalars['String'];
  uploadUrl: Scalars['String'];
  url: Scalars['String'];
};

export type AnswerInput = {
  question: QuestionInput;
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String'];
};

export type AuthInput = {
  did: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  avatarUploadUrl: Scalars['String'];
  avatarUrl: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyInvite = {
  __typename?: 'CompanyInvite';
  recipientEmail: Scalars['String'];
  role: CompanyMemberRole;
};

export type CompanyMember = {
  __typename?: 'CompanyMember';
  role: CompanyMemberRole;
  user: User;
};

export enum CompanyMemberRole {
  AdminMember = 'adminMember',
  Member = 'member'
}

export type Interview = {
  __typename?: 'Interview';
  answers: Array<Answer>;
  id: Scalars['ID'];
  jobId: Scalars['String'];
};

export type InviteMember = {
  recipientEmail?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<CompanyMemberRole>;
};

export type Job = {
  __typename?: 'Job';
  deadline: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  questions: Array<Question>;
  title: Scalars['String'];
};

export type Member = CompanyInvite | CompanyMember;

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUser: Auth;
  createJob: Job;
  deleteCompany: Company;
  deleteInterview: Interview;
  deleteInvite: CompanyInvite;
  deleteJob: Job;
  deleteMember: CompanyMember;
  deleteUser: User;
  interviews: Array<Interview>;
  inviteMember: CompanyInvite;
  members: Array<Member>;
  rateInterview: Interview;
  setupCompany: Company;
  submitInterview: Interview;
  suspendUser: User;
  updateCompany: Company;
  updateInterview: Interview;
  updateJob: Job;
  updateMember: CompanyMember;
  updateProfile: User;
};


export type MutationAuthenticateUserArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationCreateJobArgs = {
  input?: InputMaybe<NewJob>;
};


export type MutationDeleteCompanyArgs = {
  companyId: Scalars['ID'];
};


export type MutationDeleteInterviewArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteInviteArgs = {
  companyId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationDeleteJobArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMemberArgs = {
  companyId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationInterviewsArgs = {
  companyId: Scalars['ID'];
};


export type MutationInviteMemberArgs = {
  companyId: Scalars['ID'];
  input: InviteMember;
};


export type MutationMembersArgs = {
  companyId: Scalars['ID'];
};


export type MutationRateInterviewArgs = {
  companyId: Scalars['ID'];
  id: Scalars['ID'];
  value: Scalars['ID'];
};


export type MutationSetupCompanyArgs = {
  input: SetupCompany;
};


export type MutationSubmitInterviewArgs = {
  input?: InputMaybe<NewInterview>;
};


export type MutationSuspendUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCompanyArgs = {
  companyId: Scalars['ID'];
  input: UpdateProfile;
};


export type MutationUpdateInterviewArgs = {
  input?: InputMaybe<UpdateInterview>;
};


export type MutationUpdateJobArgs = {
  input?: InputMaybe<UpdateJob>;
};


export type MutationUpdateMemberArgs = {
  companyId: Scalars['ID'];
  input: UpdateMember;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfile;
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
  issuer: Scalars['String'];
  lastName: Scalars['String'];
  publicAddress: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  companies: Array<Company>;
  company: Company;
  interviews: Array<Interview>;
  job: Job;
  jobs: Array<Job>;
  profile: User;
  users: Array<User>;
};


export type QueryCompanyArgs = {
  companyId: Scalars['ID'];
};


export type QueryJobArgs = {
  id: Scalars['ID'];
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

export type SetupCompany = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateCompany = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
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

export type UpdateMember = {
  id: Scalars['ID'];
  role?: InputMaybe<CompanyMemberRole>;
};

export type UpdateProfile = {
  bio?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  linkedInProfile?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatarUploadUrl: Scalars['String'];
  avatarUrl: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  resumeUploadUrl: Scalars['String'];
  resumeUrl: Scalars['String'];
};

export type AuthenticateUserMutationVariables = Exact<{
  input?: InputMaybe<AuthInput>;
}>;


export type AuthenticateUserMutation = { __typename?: 'Mutation', authenticateUser: { __typename?: 'Auth', token: string } };

export type CreateJobMutationVariables = Exact<{
  input?: InputMaybe<NewJob>;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Job', id: string } };

export type DeleteJobMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteJobMutation = { __typename?: 'Mutation', deleteJob: { __typename?: 'Job', id: string } };

export type JobQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type JobQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title: string, deadline: any, questions: Array<{ __typename?: 'Question', id: string, question: string, time: number }> } };

export type JobsListQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsListQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, title: string, deadline: any }> };

export type UpdateJobMutationVariables = Exact<{
  input?: InputMaybe<UpdateJob>;
}>;


export type UpdateJobMutation = { __typename?: 'Mutation', updateJob: { __typename?: 'Job', id: string } };


export const AuthenticateUserDocument = gql`
    mutation AuthenticateUser($input: AuthInput) {
  authenticateUser(input: $input) {
    token
  }
}
    `;

export function useAuthenticateUserMutation() {
  return Urql.useMutation<AuthenticateUserMutation, AuthenticateUserMutationVariables>(AuthenticateUserDocument);
};
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
export const DeleteJobDocument = gql`
    mutation DeleteJob($id: ID!) {
  deleteJob(id: $id) {
    id
  }
}
    `;

export function useDeleteJobMutation() {
  return Urql.useMutation<DeleteJobMutation, DeleteJobMutationVariables>(DeleteJobDocument);
};
export const JobDocument = gql`
    query Job($id: ID!) {
  job(id: $id) {
    id
    title
    deadline
    questions {
      id
      question
      time
    }
  }
}
    `;

export function useJobQuery(options: Omit<Urql.UseQueryArgs<JobQueryVariables>, 'query'>) {
  return Urql.useQuery<JobQuery, JobQueryVariables>({ query: JobDocument, ...options });
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
export const UpdateJobDocument = gql`
    mutation UpdateJob($input: UpdateJob) {
  updateJob(input: $input) {
    id
  }
}
    `;

export function useUpdateJobMutation() {
  return Urql.useMutation<UpdateJobMutation, UpdateJobMutationVariables>(UpdateJobDocument);
};