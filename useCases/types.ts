import { default as authenticateUser } from './authenticateUser';
import { default as hello } from './hello';
import { default as jobs } from './jobs';

export type AuthenticateUser = typeof authenticateUser;
export type Hello = typeof hello;
export type Jobs = typeof jobs;
