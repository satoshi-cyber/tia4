import {
  CompanyMemberRole,
  InterviewStatus,
  PrismaClient,
} from '@prisma/client/edge';
import { condition, tineVar } from 'tinejs';
import useTine from 'tinejs.prisma';
import getClaimsSafe from '../auth/getClaimsSafe';
import presignedGet from '../s3/presignedGet';
import presignedPut from '../s3/presignedPut';

const claims = getClaimsSafe();

const prisma = new PrismaClient()
  .$extends({
    name: 'name',
    result: {
      company: {
        avatarUrl: {
          needs: { id: true },
          compute(company) {
            return tineVar(
              presignedGet({
                bucketName: 'company-avatars',
                objectName: `${company.id}.jpg`,
                expires: 3600,
              })
            );
          },
        },
        avatarUploadUrl: {
          needs: { id: true },
          compute(company) {
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
                  presignedPut({
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
      },
      interview: {
        thumbnail: {
          needs: { id: true, status: true, answers: true },
          compute(interview) {
            return tineVar(
              interview.status === InterviewStatus.ready
                ? presignedGet({
                    bucketName: 'interview-thumbnails',
                    objectName: `${interview.id}.mp4`,
                    expires: 3600,
                  })
                : presignedGet({
                    bucketName: 'answers-original',
                    objectName: `${interview.id}-${interview.answers[0].question.id}.mp4`,
                    expires: 3600,
                  })
            );
          },
        },
      },
      user: {
        avatarUrl: {
          needs: { id: true },
          compute(user) {
            return tineVar(
              presignedGet({
                bucketName: 'user-avatars',
                objectName: `${user.id}.jpg`,
                expires: 3600,
              })
            );
          },
        },
        resumeUrl: {
          needs: { id: true },
          compute(user) {
            return tineVar(
              presignedGet({
                bucketName: 'user-resumes',
                objectName: `${user.id}.pdf`,
                expires: 3600,
              })
            );
          },
        },
        resumeUploadUrl: {
          needs: { id: true },
          compute(user) {
            return tineVar(
              condition([
                tineVar(claims, ($claims) => $claims?.userId === user.id),
                tineVar(
                  presignedPut({
                    bucketName: 'user-resumes',
                    objectName: `${user.id}.pdf`,
                    expires: 3600,
                  })
                ),
                undefined,
              ])
            );
          },
        },
        avatarUploadUrl: {
          needs: { id: true },
          compute(user) {
            return tineVar(
              condition([
                tineVar(claims, ($claims) => $claims?.userId === user.id),
                tineVar(
                  presignedPut({
                    bucketName: 'user-avatars',
                    objectName: `${user.id}.jpg`,
                    expires: 3600,
                  })
                ),
                undefined,
              ])
            );
          },
        },
      },
    },
  })
  .$extends(useTine);

export default prisma;

declare global {
  namespace PrismaJson {
    // you can use classes, interfaces, types, etc.
    type Question = {
      id: string;
      question: string;
      time: number;
    };

    type Answer = {
      question: Question;
    };
  }
}
