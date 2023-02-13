import { useRouter } from 'next/router';
import { useInterviewQuery } from '@/graphql';
import { useTimeAgo, useUser } from '@/hooks';

import { useTransforms } from './RateCadidate-useTransforms';

export const useRate = () => {
  const router = useRouter();

  const { companyId } = useUser();

  const interviewId = router.query.interviewId;

  const [{ data, fetching }] = useInterviewQuery({
    variables: { companyId: companyId!, id: interviewId as string },
    pause: !companyId || !interviewId,
  });

  const transforms = useTransforms()

  const isLoading = !interviewId || !router.isReady || fetching;

  const date = useTimeAgo(data?.interview?.createdAt);

  const answers = data?.interview?.answers;
  const avatarUrl = data?.interview?.interviewee?.avatarUrl;
  const candidateName = `${data?.interview?.interviewee?.firstName} ${data?.interview?.interviewee?.lastName}`;
  const linkedinProfile = data?.interview?.interviewee?.linkedInProfile;
  const resume =
    data?.interview?.interviewee?.resumeFileName &&
    data?.interview?.interviewee?.resumeUrl &&
    `https://docs.google.com/viewer?url=${encodeURIComponent(
      data?.interview?.interviewee?.resumeUrl
    )}`;

  const messageUrl = data?.interview?.interviewee?.email
    ? `mailto:${data?.interview?.interviewee?.email}`
    : '#';


  return { transforms, messageUrl, answers, date, avatarUrl, candidateName, linkedinProfile, resume, isLoading }

};
