import { useCallback, useState } from "react";

export const useMutate = <T>(method: () => Promise<T>) => {
  const [error, setError] = useState<Error | undefined>();
  const [data, setData] = useState<T | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutate = useCallback(
    async () => {
      setError(undefined);
      setIsSubmitting(true);

      try {
        const res = await method();
        setData(res);

        return { data: res };
      } catch (e) {

        setError(e as Error);
        return { error: e };
      } finally {
        setIsSubmitting(false);
      }
    },
    [method],
  );

  return {
    mutate,
    error,
    data,
    isSubmitting,
  };
};

