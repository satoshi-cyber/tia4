import { default as authenticateUser } from './authenticateUser';
import { default as company } from './company';
import { default as companyMembers } from './companyMembers';
import { default as deleteJob } from './deleteJob';
import { default as health } from './health';
import { default as interviews } from './interviews';
import { default as job } from './job';
import { default as jobs } from './jobs';
import { default as myCompany } from './myCompany';
import { default as myInterviews } from './myInterviews';
import { default as pendingRates } from './pendingRates';
import { default as profile } from './profile';
import { default as setupCompany } from './setupCompany';
import { default as skipOnboarding } from './skipOnboarding';
import { default as updateProfile } from './updateProfile';
import { default as updateResume } from './updateResume';
import { default as upsertJob } from './upsertJob';

export type AuthenticateUser = typeof authenticateUser;
export type Company = typeof company;
export type CompanyMembers = typeof companyMembers;
export type DeleteJob = typeof deleteJob;
export type Health = typeof health;
export type Interviews = typeof interviews;
export type Job = typeof job;
export type Jobs = typeof jobs;
export type MyCompany = typeof myCompany;
export type MyInterviews = typeof myInterviews;
export type PendingRates = typeof pendingRates;
export type Profile = typeof profile;
export type SetupCompany = typeof setupCompany;
export type SkipOnboarding = typeof skipOnboarding;
export type UpdateProfile = typeof updateProfile;
export type UpdateResume = typeof updateResume;
export type UpsertJob = typeof upsertJob;
