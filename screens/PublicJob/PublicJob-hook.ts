import { useRouter } from 'next/router';
import { URLS, DOMAIN } from '@/config';
import { UseCases } from '@/useCases';

export const usePublicJob = () => {
  const router = useRouter();

  const jobId = String(router.query.applyJobId);

  const { data, isLoading: fetching } = UseCases.publicJob.load({ id: jobId });

  const url = encodeURIComponent(
    `${DOMAIN}${URLS.APPLY.replace('[applyJobId]', jobId)}`
  );

  const href = `https://theinterview.page.link/?link=${url}`;

  const jobTitle = data?.title;

  const companyName = data?.company?.name || 'placeholder';

  const companyWebsite = data?.company?.website;

  const jobDescription = data?.description;

  const isLoading = fetching || !router.isReady;

  return {
    isLoading,
    href,
    jobTitle,
    jobDescription,
    companyName,
    companyWebsite,
  };
};
