export type JWTClaims = {
  iat: number
  exp: number
  userId: string;
  userRole: string;
  companyRoles: Array<{
    companyId: string;
    role: string;
  }>;
}
