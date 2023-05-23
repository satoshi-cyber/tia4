import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SubmitInterviewProps } from './SubmitInterview-types';
import { useRouter } from 'next/router';
import { TOAST_OPTIONS, URLS } from '@/config';
import { useUser } from '@/hooks';

import { TOAST_ERROR } from './SubmitInterview-constants';
import { UseCases } from '@/useCases';

export const useSubmitInterview = ({
  videos,
  questions,
  deleteVideo,
  swiper,
}: SubmitInterviewProps) => {
  const { refreshToken, claims } = useUser();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadProgres, setUploadProgres] = useState(-1);

  const uploadingIds = useRef<Record<string, number>>({});

  const router = useRouter();

  const jobId = String(router.query.applyJobId);

  const {
    trigger: submitInterviewMutation,
    isMutating: interviewIsSubmitting,
  } = UseCases.submitInterview.mutate();

  const { trigger: progressInterview, isMutating: interviewIsProcessing } =
    UseCases.processInterview.mutate();

  const isUploading =
    interviewIsSubmitting || uploadProgres !== -1 || interviewIsProcessing;

  const closeDialog = () => setIsDialogOpen(false);

  const submitInterview = async () => {
    if (Object.keys(videos).length === 0) {
      setIsDialogOpen(true);
      return;
    }

    swiper?.disable();

    setUploadProgres(0);

    const answers = questions
      .filter((question) => videos[question.id])
      .map((question) => ({ question }));

    try {
      const res = await submitInterviewMutation({ jobId, answers });

      res?.answers.forEach(async (answer) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', answer.uploadUrl!);

        xhr.upload.addEventListener('progress', async (e) => {
          uploadingIds.current[answer.question.id] = (e.loaded / e.total) * 100;

          const totalProgress = Math.floor(
            Object.values(uploadingIds.current).reduce(
              (sum, current) => sum + current,
              0
            ) / Object.keys(uploadingIds.current).length
          );
          setUploadProgres(totalProgress);

          if (totalProgress === 100) {
            questions.map((question) => deleteVideo(question.id));

            await progressInterview({
              id: res.id,
            });

            if (!claims?.onboarded) {
              await refreshToken();
            }

            router.push(URLS.MY_INTERVIEWS);
          }
        });

        uploadingIds.current[answer.question.id] = 0;

        const video = videos[answer.question.id];

        xhr.send(
          new File([video], `${answer.question.id}.mp4`, { type: video.type })
        );
      });
    } catch (e) {
      toast.error(TOAST_ERROR, TOAST_OPTIONS);
      setUploadProgres(-1);
      swiper?.enable();

      return;
    }
  };

  return {
    submitInterview,
    isUploading,
    closeDialog,
    isDialogOpen,
    uploadProgres,
  };
};
