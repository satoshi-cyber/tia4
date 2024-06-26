import { condition, tineVar } from 'tinejs';
import s3 from '@/actions/s3';
import auth from '@/actions/auth';

const claims = auth.getClaimsSafe(undefined, { skipLog: true });

const user = {
  avatarUrl: {
    needs: { id: true },
    compute(user: { id: string }) {
      return tineVar(
        s3.presignedGet({
          bucketName: 'user-avatars',
          objectName: `${user.id}.jpg`,
          expires: 3600,
        })
      );
    },
  },
  resumeUrl: {
    needs: { id: true },
    compute(user: { id: string }) {
      return tineVar(
        s3.presignedGet({
          bucketName: 'user-resumes',
          objectName: `${user.id}.pdf`,
          expires: 3600,
        })
      );
    },
  },
  resumeUploadUrl: {
    needs: { id: true },
    compute(user: { id: string }) {
      return tineVar(
        condition(
          {
            if: tineVar(claims, ($claims) => $claims?.userId === user.id),
            then: tineVar(
              s3.presignedPut({
                bucketName: 'user-resumes',
                objectName: `${user.id}.pdf`,
                expires: 3600,
              })
            ),
            else: undefined,
          },
          { skipLog: true }
        )
      );
    },
  },
  avatarUploadUrl: {
    needs: { id: true },
    compute(user: { id: string }) {
      return tineVar(
        condition(
          {
            if: tineVar(claims, ($claims) => $claims?.userId === user.id),
            then: tineVar(
              s3.presignedPut({
                bucketName: 'user-avatars',
                objectName: `${user.id}.jpg`,
                expires: 3600,
              })
            ),
            else: undefined,
          },
          { skipLog: true }
        )
      );
    },
  },
};

export default user;
