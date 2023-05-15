import { TOAST_OPTIONS, URLS } from '@/config';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { TOAST_MESSAGE } from './Item-constants';

interface ItemOptions {
  jobId: string | number;
  deadline: Date | undefined;
}

export const useItem = ({ jobId, deadline }: ItemOptions) => {
  const router = useRouter();

  const handleEditJob = () => {
    router.push({ pathname: URLS.JOB, query: { jobId } });
  };

  const handleCopyLink = async () => {
    try {
      const baseUrl = window.location.href.split(window.location.pathname)[0];

      const pathname = URLS.PUBLIC_JOB.replace('[applyJobId]', String(jobId));

      await navigator.clipboard.writeText(`${baseUrl}${pathname}`);

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);
    } catch (e) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);
    }
  };

  const deadlineLabel =
    deadline && `Deadline: ${format(deadline, 'MM/dd/yyyy')}`;

  return { handleEditJob, handleCopyLink, deadlineLabel };
};
