import { default as authenticateUser } from './authenticateUser';
import { default as company } from './company';
import { default as hello } from './hello';
import { default as interviews } from './interviews';
import { default as job } from './job';
import { default as jobs } from './jobs';
import { default as profile } from './profile';
import { default as sign } from './sign';

export type AuthenticateUser = typeof authenticateUser;
export type Company = typeof company;
export type Hello = typeof hello;
export type Interviews = typeof interviews;
export type Job = typeof job;
export type Jobs = typeof jobs;
export type Profile = typeof profile;
export type Sign = typeof sign;
