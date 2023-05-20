import { condition, tineVar } from 'tinejs';
import { CompanyMemberRole } from '@prisma/client/edge';
import s3 from '@/actions/s3';
import auth from '@/actions/auth';

const claims = auth.getClaimsSafe();

const company = {
  avatarUrl: {
    needs: { id: true },
    compute(company: { id: string }) {
      return tineVar(
        s3.presignedGet({
          bucketName: 'company-avatars',
          objectName: `${company.id}.jpg`,
          expires: 3600,
          cache: true,
        })
      );
    },
  },
  avatarUploadUrl: {
    needs: { id: true },
    compute(company: { id: string }) {
      return tineVar(
        condition([
          tineVar(
            claims,
            ($claims) =>
              $claims?.companyRoles.findIndex(
                (role) =>
                  role.companyId === company.id &&
                  role.role === CompanyMemberRole.adminMember
              ) !== -1
          ),
          tineVar(
            s3.presignedPut({
              bucketName: 'company-avatars',
              objectName: `${company.id}.jpg`,
              expires: 3600,
            })
          ),
          undefined,
        ])
      );
    },
  },
};

export default company;
