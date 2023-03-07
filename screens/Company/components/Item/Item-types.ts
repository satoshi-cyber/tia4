import { CompanyInvite, CompanyMember, User } from "@/graphql";

export interface ItemProps {
  member: Pick<CompanyMember, 'role'> & { user: Pick<User, 'firstName' | 'lastName' | 'id' | 'avatarUrl' | 'email'> } | CompanyInvite
}
