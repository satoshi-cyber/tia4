import { useRouter } from 'next/router';
import { useInterviewQuery } from '@/graphql';
import { useTimeAgo, useUser } from '@/hooks';

import { useTransforms } from './RateCadidate-useTransforms';
import { DEMO_INTERVIEW } from './RateCadidate-constants';

export const useRate = () => {
  const router = useRouter();

  const { companyId } = useUser();

  const interviewId = router.query.interviewId;

  const isDemoInterview = interviewId === 'demo'

  const [{ data, fetching }] = useInterviewQuery({
    variables: { companyId: companyId!, id: interviewId as string },
    pause: !companyId || !interviewId || isDemoInterview,
  });


  const transforms = useTransforms()

  const isLoading = !interviewId || !router.isReady || fetching;

  const date = useTimeAgo(data?.interview?.createdAt);

  const answers = isDemoInterview ? DEMO_INTERVIEW.answers : data?.interview?.answers;
  const avatarUrl = isDemoInterview ? DEMO_INTERVIEW.avatarUrl : data?.interview?.interviewee?.avatarUrl;

  const candidateName = isDemoInterview ? DEMO_INTERVIEW.name : `${data?.interview?.interviewee?.firstName} ${data?.interview?.interviewee?.lastName}`;
  const linkedinProfile = data?.interview?.interviewee?.linkedInProfile;

  const resume =
    isDemoInterview ? DEMO_INTERVIEW.resume
      :
      data?.interview?.interviewee?.resumeFileName &&
      data?.interview?.interviewee?.resumeUrl

  const resumeLink = resume &&
    `https://docs.google.com/viewer?url=${encodeURIComponent(resume)}`;


  const messageUrl = isDemoInterview ? DEMO_INTERVIEW.emailLink : data?.interview?.interviewee?.email
    ? `mailto:${data?.interview?.interviewee?.email}`
    : '#';

  return { transforms, resumeLink, messageUrl, answers, date, avatarUrl, candidateName, linkedinProfile, resume, isLoading }

};
