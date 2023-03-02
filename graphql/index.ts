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
  uploadUrl?: Maybe<Scalars['String']>;
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
  accessToken?: InputMaybe<Scalars['String']>;
  did: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  fk?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
};

export type Candidate = {
  __typename?: 'Candidate';
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  linkedInProfile?: Maybe<Scalars['String']>;
  resumeFileName?: Maybe<Scalars['String']>;
  resumeUrl?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  avatarUploadUrl?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
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
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  interviewee?: Maybe<Candidate>;
  job?: Maybe<Job>;
  jobId: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  thumbnail: Scalars['String'];
};

export type InviteMember = {
  recipientEmail: Scalars['String'];
  role: CompanyMemberRole;
};

export type Job = {
  __typename?: 'Job';
  company?: Maybe<Company>;
  deadline: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  questions: Array<Question>;
  title: Scalars['String'];
};

export type ListInterviewsFilters = {
  jobId?: InputMaybe<Scalars['ID']>;
  query?: InputMaybe<Scalars['String']>;
};

export type Member = CompanyInvite | CompanyMember;

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUser: Auth;
  createJob: Job;
  deleteCompany?: Maybe<Company>;
  deleteInterview: Interview;
  deleteInvite: CompanyInvite;
  deleteJob: Job;
  deleteMember: CompanyMember;
  deleteUser: User;
  finalizeInterview: Scalars['Boolean'];
  interviews: Array<Interview>;
  inviteMember: CompanyInvite;
  processInterview: Scalars['Boolean'];
  rateInterview: Interview;
  removeResume: User;
  setupCompany: Company;
  submitInterview: Interview;
  suspendUser: User;
  updateCompany: Company;
  updateJob: Job;
  updateMember: CompanyMember;
  updateProfile: User;
};


export type MutationAuthenticateUserArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationCreateJobArgs = {
  companyId: Scalars['ID'];
  input: NewJob;
};


export type MutationDeleteCompanyArgs = {
  companyId: Scalars['ID'];
};


export type MutationDeleteInterviewArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteInviteArgs = {
  companyId: Scalars['ID'];
  recipientEmail: Scalars['String'];
};


export type MutationDeleteJobArgs = {
  companyId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationDeleteMemberArgs = {
  companyId: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationFinalizeInterviewArgs = {
  id: Scalars['ID'];
  secret: Scalars['String'];
};


export type MutationInterviewsArgs = {
  companyId: Scalars['ID'];
};


export type MutationInviteMemberArgs = {
  companyId: Scalars['ID'];
  input: InviteMember;
};


export type MutationProcessInterviewArgs = {
  id: Scalars['ID'];
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
  input: UpdateCompany;
};


export type MutationUpdateJobArgs = {
  companyId: Scalars['ID'];
  input: UpdateJob;
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
  didApply: Scalars['Boolean'];
  interview: Interview;
  interviews: Array<Interview>;
  job: Job;
  jobs: Array<Job>;
  members: Array<Member>;
  myInterview: Interview;
  myInterviews: Array<Interview>;
  profile: User;
  users: Array<User>;
};


export type QueryCompanyArgs = {
  companyId: Scalars['ID'];
};


export type QueryDidApplyArgs = {
  jobId: Scalars['ID'];
};


export type QueryInterviewArgs = {
  companyId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryInterviewsArgs = {
  companyId: Scalars['ID'];
  filters?: InputMaybe<ListInterviewsFilters>;
};


export type QueryJobArgs = {
  id: Scalars['ID'];
};


export type QueryJobsArgs = {
  companyId: Scalars['ID'];
};


export type QueryMembersArgs = {
  companyId: Scalars['ID'];
};


export type QueryMyInterviewArgs = {
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
  name: Scalars['String'];
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateCompany = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
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
  resumeFileName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatarUploadUrl?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  linkedInProfile?: Maybe<Scalars['String']>;
  resumeFileName?: Maybe<Scalars['String']>;
  resumeUploadUrl?: Maybe<Scalars['String']>;
  resumeUrl?: Maybe<Scalars['String']>;
};

export type AuthenticateUserMutationVariables = Exact<{
  input?: InputMaybe<AuthInput>;
}>;


export type AuthenticateUserMutation = { __typename?: 'Mutation', authenticateUser: { __typename?: 'Auth', token: string } };

export type CompanyInfoQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type CompanyInfoQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, name?: string | null, website?: string | null, description?: string | null, avatarUrl?: string | null } };

export type CreateJobMutationVariables = Exact<{
  companyId: Scalars['ID'];
  input: NewJob;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Job', id: string } };

export type DeleteCompanyMutationVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany?: { __typename?: 'Company', id: string } | null };

export type DeleteInterviewMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteInterviewMutation = { __typename?: 'Mutation', deleteInterview: { __typename?: 'Interview', id: string } };

export type DeleteInviteMutationVariables = Exact<{
  companyId: Scalars['ID'];
  recipientEmail: Scalars['String'];
}>;


export type DeleteInviteMutation = { __typename?: 'Mutation', deleteInvite: { __typename?: 'CompanyInvite', recipientEmail: string, role: CompanyMemberRole } };

export type DeleteJobMutationVariables = Exact<{
  companyId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type DeleteJobMutation = { __typename?: 'Mutation', deleteJob: { __typename?: 'Job', id: string } };

export type DidApplyQueryVariables = Exact<{
  jobId: Scalars['ID'];
}>;


export type DidApplyQuery = { __typename?: 'Query', didApply: boolean };

export type EditCompanyQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type EditCompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, name?: string | null, website?: string | null, description?: string | null, avatarUrl?: string | null, avatarUploadUrl?: string | null } };

export type InterviewQueryVariables = Exact<{
  companyId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type InterviewQuery = { __typename?: 'Query', interview: { __typename?: 'Interview', id: string, thumbnail: string, createdAt: any, job?: { __typename?: 'Job', id: string, title: string, deadline: any, company?: { __typename?: 'Company', id: string, name?: string | null, avatarUrl?: string | null } | null } | null, answers: Array<{ __typename?: 'Answer', url: string, question: { __typename?: 'Question', id: string, question: string, time: number } }>, interviewee?: { __typename?: 'Candidate', linkedInProfile?: string | null, resumeFileName?: string | null, resumeUrl?: string | null, avatarUrl?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, bio?: string | null } | null } };

export type InterviewsQueryVariables = Exact<{
  companyId: Scalars['ID'];
  filters?: InputMaybe<ListInterviewsFilters>;
}>;


export type InterviewsQuery = { __typename?: 'Query', interviews: Array<{ __typename?: 'Interview', id: string, thumbnail: string, createdAt: any, score?: number | null, interviewee?: { __typename?: 'Candidate', avatarUrl?: string | null, firstName?: string | null, lastName?: string | null } | null }> };

export type InviteMemberMutationVariables = Exact<{
  companyId: Scalars['ID'];
  input: InviteMember;
}>;


export type InviteMemberMutation = { __typename?: 'Mutation', inviteMember: { __typename?: 'CompanyInvite', recipientEmail: string } };

export type JobQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type JobQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title: string, deadline: any, description?: string | null, questions: Array<{ __typename?: 'Question', id: string, question: string, time: number }>, company?: { __typename?: 'Company', id: string, name?: string | null, avatarUrl?: string | null } | null } };

export type JobsListQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type JobsListQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, title: string, deadline: any }> };

export type MembersQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type MembersQuery = { __typename?: 'Query', members: Array<{ __typename: 'CompanyInvite', role: CompanyMemberRole, recipientEmail: string } | { __typename: 'CompanyMember', role: CompanyMemberRole, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatarUrl?: string | null } }> };

export type MyInterviewQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MyInterviewQuery = { __typename?: 'Query', myInterview: { __typename?: 'Interview', id: string, thumbnail: string, createdAt: any, job?: { __typename?: 'Job', id: string, title: string, deadline: any, company?: { __typename?: 'Company', id: string, name?: string | null, avatarUrl?: string | null } | null } | null, answers: Array<{ __typename?: 'Answer', url: string, question: { __typename?: 'Question', id: string, question: string, time: number } }> } };

export type MyInterviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInterviewsQuery = { __typename?: 'Query', myInterviews: Array<{ __typename?: 'Interview', id: string, thumbnail: string, createdAt: any, job?: { __typename?: 'Job', id: string, title: string, deadline: any, company?: { __typename?: 'Company', id: string, name?: string | null, avatarUrl?: string | null } | null } | null }> };

export type ProcessInterviewMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProcessInterviewMutation = { __typename?: 'Mutation', processInterview: boolean };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, bio?: string | null, firstName?: string | null, lastName?: string | null, resumeUrl?: string | null, avatarUrl?: string | null, resumeUploadUrl?: string | null, avatarUploadUrl?: string | null, resumeFileName?: string | null, linkedInProfile?: string | null } };

export type RemoveResumeMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveResumeMutation = { __typename?: 'Mutation', removeResume: { __typename?: 'User', id: string, bio?: string | null, firstName?: string | null, lastName?: string | null, resumeUrl?: string | null, avatarUrl?: string | null, resumeUploadUrl?: string | null, avatarUploadUrl?: string | null, resumeFileName?: string | null, linkedInProfile?: string | null } };

export type SetupCompanyMutationVariables = Exact<{
  input: SetupCompany;
}>;


export type SetupCompanyMutation = { __typename?: 'Mutation', setupCompany: { __typename?: 'Company', id: string } };

export type SubmitInterviewMutationVariables = Exact<{
  input: NewInterview;
}>;


export type SubmitInterviewMutation = { __typename?: 'Mutation', submitInterview: { __typename?: 'Interview', id: string, answers: Array<{ __typename?: 'Answer', uploadUrl?: string | null, question: { __typename?: 'Question', id: string } }> } };

export type UpdateCompanyMutationVariables = Exact<{
  companyId: Scalars['ID'];
  input: UpdateCompany;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: string, name?: string | null, website?: string | null, description?: string | null } };

export type UpdateJobMutationVariables = Exact<{
  companyId: Scalars['ID'];
  input: UpdateJob;
}>;


export type UpdateJobMutation = { __typename?: 'Mutation', updateJob: { __typename?: 'Job', id: string } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfile;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, bio?: string | null, firstName?: string | null, lastName?: string | null, resumeUrl?: string | null, avatarUrl?: string | null, resumeUploadUrl?: string | null, avatarUploadUrl?: string | null, linkedInProfile?: string | null } };


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
export const CompanyInfoDocument = gql`
    query CompanyInfo($companyId: ID!) {
  company(companyId: $companyId) {
    id
    name
    website
    description
    avatarUrl
  }
}
    `;

export function useCompanyInfoQuery(options: Omit<Urql.UseQueryArgs<CompanyInfoQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyInfoQuery, CompanyInfoQueryVariables>({ query: CompanyInfoDocument, ...options });
};
export const CreateJobDocument = gql`
    mutation CreateJob($companyId: ID!, $input: NewJob!) {
  createJob(companyId: $companyId, input: $input) {
    id
  }
}
    `;

export function useCreateJobMutation() {
  return Urql.useMutation<CreateJobMutation, CreateJobMutationVariables>(CreateJobDocument);
};
export const DeleteCompanyDocument = gql`
    mutation DeleteCompany($companyId: ID!) {
  deleteCompany(companyId: $companyId) {
    id
  }
}
    `;

export function useDeleteCompanyMutation() {
  return Urql.useMutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(DeleteCompanyDocument);
};
export const DeleteInterviewDocument = gql`
    mutation DeleteInterview($id: ID!) {
  deleteInterview(id: $id) {
    id
  }
}
    `;

export function useDeleteInterviewMutation() {
  return Urql.useMutation<DeleteInterviewMutation, DeleteInterviewMutationVariables>(DeleteInterviewDocument);
};
export const DeleteInviteDocument = gql`
    mutation DeleteInvite($companyId: ID!, $recipientEmail: String!) {
  deleteInvite(companyId: $companyId, recipientEmail: $recipientEmail) {
    recipientEmail
    role
  }
}
    `;

export function useDeleteInviteMutation() {
  return Urql.useMutation<DeleteInviteMutation, DeleteInviteMutationVariables>(DeleteInviteDocument);
};
export const DeleteJobDocument = gql`
    mutation DeleteJob($companyId: ID!, $id: ID!) {
  deleteJob(companyId: $companyId, id: $id) {
    id
  }
}
    `;

export function useDeleteJobMutation() {
  return Urql.useMutation<DeleteJobMutation, DeleteJobMutationVariables>(DeleteJobDocument);
};
export const DidApplyDocument = gql`
    query DidApply($jobId: ID!) {
  didApply(jobId: $jobId)
}
    `;

export function useDidApplyQuery(options: Omit<Urql.UseQueryArgs<DidApplyQueryVariables>, 'query'>) {
  return Urql.useQuery<DidApplyQuery, DidApplyQueryVariables>({ query: DidApplyDocument, ...options });
};
export const EditCompanyDocument = gql`
    query EditCompany($companyId: ID!) {
  company(companyId: $companyId) {
    id
    name
    website
    description
    avatarUrl
    avatarUploadUrl
  }
}
    `;

export function useEditCompanyQuery(options: Omit<Urql.UseQueryArgs<EditCompanyQueryVariables>, 'query'>) {
  return Urql.useQuery<EditCompanyQuery, EditCompanyQueryVariables>({ query: EditCompanyDocument, ...options });
};
export const InterviewDocument = gql`
    query Interview($companyId: ID!, $id: ID!) {
  interview(companyId: $companyId, id: $id) {
    id
    thumbnail
    createdAt
    job {
      id
      title
      deadline
      company {
        id
        name
        avatarUrl
      }
    }
    answers {
      question {
        id
        question
        time
      }
      url
    }
    interviewee {
      linkedInProfile
      resumeFileName
      resumeUrl
      avatarUrl
      email
      firstName
      lastName
      bio
    }
  }
}
    `;

export function useInterviewQuery(options: Omit<Urql.UseQueryArgs<InterviewQueryVariables>, 'query'>) {
  return Urql.useQuery<InterviewQuery, InterviewQueryVariables>({ query: InterviewDocument, ...options });
};
export const InterviewsDocument = gql`
    query Interviews($companyId: ID!, $filters: ListInterviewsFilters) {
  interviews(companyId: $companyId, filters: $filters) {
    id
    thumbnail
    createdAt
    score
    interviewee {
      avatarUrl
      firstName
      lastName
    }
  }
}
    `;

export function useInterviewsQuery(options: Omit<Urql.UseQueryArgs<InterviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<InterviewsQuery, InterviewsQueryVariables>({ query: InterviewsDocument, ...options });
};
export const InviteMemberDocument = gql`
    mutation InviteMember($companyId: ID!, $input: InviteMember!) {
  inviteMember(companyId: $companyId, input: $input) {
    recipientEmail
  }
}
    `;

export function useInviteMemberMutation() {
  return Urql.useMutation<InviteMemberMutation, InviteMemberMutationVariables>(InviteMemberDocument);
};
export const JobDocument = gql`
    query Job($id: ID!) {
  job(id: $id) {
    id
    title
    deadline
    description
    questions {
      id
      question
      time
    }
    company {
      id
      name
      avatarUrl
    }
  }
}
    `;

export function useJobQuery(options: Omit<Urql.UseQueryArgs<JobQueryVariables>, 'query'>) {
  return Urql.useQuery<JobQuery, JobQueryVariables>({ query: JobDocument, ...options });
};
export const JobsListDocument = gql`
    query JobsList($companyId: ID!) {
  jobs(companyId: $companyId) {
    id
    title
    deadline
  }
}
    `;

export function useJobsListQuery(options: Omit<Urql.UseQueryArgs<JobsListQueryVariables>, 'query'>) {
  return Urql.useQuery<JobsListQuery, JobsListQueryVariables>({ query: JobsListDocument, ...options });
};
export const MembersDocument = gql`
    query Members($companyId: ID!) {
  members(companyId: $companyId) {
    __typename
    ... on CompanyMember {
      role
      user {
        id
        firstName
        lastName
        avatarUrl
      }
    }
    ... on CompanyInvite {
      role
      recipientEmail
    }
  }
}
    `;

export function useMembersQuery(options: Omit<Urql.UseQueryArgs<MembersQueryVariables>, 'query'>) {
  return Urql.useQuery<MembersQuery, MembersQueryVariables>({ query: MembersDocument, ...options });
};
export const MyInterviewDocument = gql`
    query MyInterview($id: ID!) {
  myInterview(id: $id) {
    id
    thumbnail
    createdAt
    job {
      id
      title
      deadline
      company {
        id
        name
        avatarUrl
      }
    }
    answers {
      question {
        id
        question
        time
      }
      url
    }
  }
}
    `;

export function useMyInterviewQuery(options: Omit<Urql.UseQueryArgs<MyInterviewQueryVariables>, 'query'>) {
  return Urql.useQuery<MyInterviewQuery, MyInterviewQueryVariables>({ query: MyInterviewDocument, ...options });
};
export const MyInterviewsDocument = gql`
    query MyInterviews {
  myInterviews {
    id
    thumbnail
    createdAt
    job {
      id
      title
      deadline
      company {
        id
        name
        avatarUrl
      }
    }
  }
}
    `;

export function useMyInterviewsQuery(options?: Omit<Urql.UseQueryArgs<MyInterviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<MyInterviewsQuery, MyInterviewsQueryVariables>({ query: MyInterviewsDocument, ...options });
};
export const ProcessInterviewDocument = gql`
    mutation ProcessInterview($id: ID!) {
  processInterview(id: $id)
}
    `;

export function useProcessInterviewMutation() {
  return Urql.useMutation<ProcessInterviewMutation, ProcessInterviewMutationVariables>(ProcessInterviewDocument);
};
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    bio
    firstName
    lastName
    resumeUrl
    avatarUrl
    resumeUploadUrl
    avatarUploadUrl
    resumeFileName
    linkedInProfile
  }
}
    `;

export function useProfileQuery(options?: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfileQuery, ProfileQueryVariables>({ query: ProfileDocument, ...options });
};
export const RemoveResumeDocument = gql`
    mutation RemoveResume {
  removeResume {
    id
    bio
    firstName
    lastName
    resumeUrl
    avatarUrl
    resumeUploadUrl
    avatarUploadUrl
    resumeFileName
    linkedInProfile
  }
}
    `;

export function useRemoveResumeMutation() {
  return Urql.useMutation<RemoveResumeMutation, RemoveResumeMutationVariables>(RemoveResumeDocument);
};
export const SetupCompanyDocument = gql`
    mutation SetupCompany($input: SetupCompany!) {
  setupCompany(input: $input) {
    id
  }
}
    `;

export function useSetupCompanyMutation() {
  return Urql.useMutation<SetupCompanyMutation, SetupCompanyMutationVariables>(SetupCompanyDocument);
};
export const SubmitInterviewDocument = gql`
    mutation SubmitInterview($input: NewInterview!) {
  submitInterview(input: $input) {
    id
    answers {
      uploadUrl
      question {
        id
      }
    }
  }
}
    `;

export function useSubmitInterviewMutation() {
  return Urql.useMutation<SubmitInterviewMutation, SubmitInterviewMutationVariables>(SubmitInterviewDocument);
};
export const UpdateCompanyDocument = gql`
    mutation UpdateCompany($companyId: ID!, $input: UpdateCompany!) {
  updateCompany(companyId: $companyId, input: $input) {
    id
    name
    website
    description
  }
}
    `;

export function useUpdateCompanyMutation() {
  return Urql.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument);
};
export const UpdateJobDocument = gql`
    mutation UpdateJob($companyId: ID!, $input: UpdateJob!) {
  updateJob(companyId: $companyId, input: $input) {
    id
  }
}
    `;

export function useUpdateJobMutation() {
  return Urql.useMutation<UpdateJobMutation, UpdateJobMutationVariables>(UpdateJobDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfile!) {
  updateProfile(input: $input) {
    id
    bio
    firstName
    lastName
    resumeUrl
    avatarUrl
    resumeUploadUrl
    avatarUploadUrl
    linkedInProfile
  }
}
    `;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};