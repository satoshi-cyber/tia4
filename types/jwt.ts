export type JWTClaims = {
  iat: number;
  exp: number;
  userId: string;
  userRole: string;
  onboarded?: boolean;
  companyRoles: Array<{
    companyId: string;
    role: string;
  }>;
};
