import { tineVar } from 'tinejs';
import { InterviewStatus } from '@prisma/client/edge';
import s3 from '@/actions/s3';

const interview = {
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
              cache: true,
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
