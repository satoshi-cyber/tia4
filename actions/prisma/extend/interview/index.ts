import { condition, tineVar } from 'tinejs';
import { InterviewStatus, User } from '@prisma/client/edge';
import auth from '@/actions/auth';
import s3 from '@/actions/s3';

const claims = auth.getClaimsSafe();

const interview = {
  answers: {
    needs: { id: true, interviewee: true, answers: true, status: true },
    compute(interview: {
      id: string;
      status: InterviewStatus;
      interviewee: User;
      answers: PrismaJson.Answer[];
    }) {
      return interview?.answers?.map((answer) => ({
        ...answer,
        url: tineVar(
          interview.status === InterviewStatus.ready
            ? s3.presignedGet({
                bucketName: 'answers-converted',
                objectName: `${interview.id}-${answer.question.id}.mp4`,
                expires: 3600,
              })
            : s3.presignedGet({
                bucketName: 'answers-original',
                objectName: `${interview.id}-${answer.question.id}.mp4`,
                expires: 3600,
              })
        ),
        uploadUrl: tineVar(
          condition([
            tineVar(
              claims,
              ($claims) => $claims?.userId === interview.interviewee.id
            ),
            tineVar(
              s3.presignedPut({
                bucketName: 'answers-original',
                objectName: `${interview.id}-${answer.question.id}.mp4`,
                expires: 3600,
              })
            ),
            undefined,
          ])
        ),
      }));
    },
  },
  thumbnail: {
    needs: { id: true, status: true, answers: true },
    compute(interview: {
      id: string;
      status: InterviewStatus;
      answers: PrismaJson.Answer[];
    }) {
      return tineVar(
        interview.status === InterviewStatus.ready
          ? s3.presignedGet({
              bucketName: 'interview-thumbnails',
              objectName: `${interview.id}.mp4`,
              expires: 3600,
            })
          : s3.presignedGet({
              bucketName: 'answers-original',
              objectName: `${interview.id}-${interview.answers[0].question.id}.mp4`,
              expires: 3600,
            })
      );
    },
  },
};

export default interview;
