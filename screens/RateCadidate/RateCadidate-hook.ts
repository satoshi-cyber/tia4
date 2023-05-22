import { useRouter } from 'next/router';
import { useTimeAgo, useUser } from '@/hooks';

import { useTransforms } from './RateCadidate-useTransforms';
import { DEMO_INTERVIEW } from './RateCadidate-constants';
import { UseCases } from '@/useCases';

export const useRate = () => {
  const router = useRouter();

  const { companyId } = useUser();

  const interviewId = String(router.query.interviewId);

  const isDemoInterview = interviewId === 'demo';

  const { data, isLoading: fetching } = UseCases.interview.load(
    companyId && !isDemoInterview && { companyId, id: interviewId },
    { revalidateOnFocus: false }
  );

  const transforms = useTransforms();

  const isLoading = !interviewId || !router.isReady || fetching;

  const date = useTimeAgo(
    isDemoInterview ? DEMO_INTERVIEW.date : data?.createdAt
  );

  const answers = isDemoInterview ? DEMO_INTERVIEW.answers : data?.answers;
  const avatarUrl = isDemoInterview
    ? DEMO_INTERVIEW.avatarUrl
    : data?.interviewee?.avatarUrl;

  const candidateName = isDemoInterview
    ? DEMO_INTERVIEW.name
    : `${data?.interviewee?.firstName} ${data?.interviewee?.lastName}`;
  const linkedinProfile = data?.interviewee?.linkedInProfile;

  const resume = isDemoInterview
    ? DEMO_INTERVIEW.resume
    : data?.interviewee?.resumeFileName && data?.interviewee?.resumeUrl;

  const resumeLink =
    resume &&
    `https://docs.google.com/viewer?url=${encodeURIComponent(resume)}`;

  const messageUrl = isDemoInterview
    ? DEMO_INTERVIEW.emailLink
    : data?.interviewee?.email
    ? `mailto:${data?.interviewee?.email}`
    : '#';

  const jobTitle = isDemoInterview ? DEMO_INTERVIEW.jobTitle : data?.job?.title;

  return {
    jobTitle,
    transforms,
    resumeLink,
    messageUrl,
    answers,
    date,
    avatarUrl,
    candidateName,
    linkedinProfile,
    resume,
    isLoading,
  };
};
