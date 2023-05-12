import { env } from '@/actions/config';
import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { AuthError, JWTClaims } from '@/types';
import { jwtVerify } from 'jose';
import { tineAction } from 'tinejs';

const getClaims = tineAction(
  async ({ companyId }: { companyId?: string }, { ctx }) => {
    try {
      const token = ctx.get('cookies').get(TOKEN_COOKIE_KEY)?.value;

      if (!token) {
        throw new Error('No token');
      }

      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(env.JWT_SECRET)
      );

      const data = payload as JWTClaims;

      if (companyId) {
        const belogsToUser = data.companyRoles.find(
          (company) => company.companyId === companyId
        );

        if (!belogsToUser) {
          throw new Error('Invalid company id');
        }

        return { ...data, companyId };
      }

      return data;
    } catch (e: any) {
      throw new AuthError(e.message);
    }
  },
  {
    action: 'auth.getClaims',
  }
);

export default getClaims;
