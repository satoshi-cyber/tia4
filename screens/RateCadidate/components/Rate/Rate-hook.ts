import { TOAST_OPTIONS, URLS } from '@/config';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  CLASS_NAMES,
  DEMO_INTERVIEW_ID,
  PUSH_DELAY,
  TOAST_MESSAGE,
} from './Rate-constants';
import { mutate } from 'swr';
import { UseCases } from '@/useCases';

export const useRate = ({ className }: { className?: string }) => {
  const router = useRouter();

  const interviewId = router.query.interviewId as string;

  const [score, setScore] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = UseCases.didRateInterview.load(
    interviewId && { interviewId }
  );

  const { isMutating, trigger: rateInterview } =
    UseCases.rateInterview.mutate();

  const classNames = {
    ...CLASS_NAMES,
    constainer: clsx(CLASS_NAMES.container, className),
  };

  const handleRate = (index: number) => {
    setScore(index);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = async () => {
    if (interviewId === DEMO_INTERVIEW_ID) {
      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

      closeDialog();

      setTimeout(() => router.push(URLS.RATE), PUSH_DELAY);

      return;
    }

    try {
      await rateInterview({ interviewId, value: score });

      closeDialog();

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS);

      mutate(UseCases.pendingRates.getKey());

      setTimeout(() => router.push(URLS.RATE), PUSH_DELAY);
    } catch (e) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS);
    }
  };

  const value = data?.value;

  const isScoreVisible = value || value === 0;

  const scoreLabel = `your score: ${value} / 4`;

  return {
    isLoading,
    isMutating,
    value,
    score,
    classNames,
    isScoreVisible,
    scoreLabel,
    isDialogOpen,
    handleConfirm,
    closeDialog,
    handleRate,
  };
};
