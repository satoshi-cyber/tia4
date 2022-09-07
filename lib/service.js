import React from "react";
import { useCallback, useState } from "react";
import useSWRImmutable from "swr/immutable";

let hooks = {};

export const addHook = (name, action) => {
  hooks = { ...hooks, [name]: action };
};

export const useHook = (key) => {
  const [method, ...params] = key;

  if (!hooks[method]) {
    return () => {};
  }

  return hooks[method](...params);
};

export const useLoadData = (key, options) => {
  const fetcher = useHook(key);

  return useSWRImmutable(key, fetcher, options);
};

export const useGet = (url) => () =>
  fetch(url).then((response) => response.json());

export const useAction = (key) => {
  const method = useHook(key);

  const [error, setError] = useState();
  const [data, setData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const action = useCallback(
    async (...arg) => {
      setError();
      setIsSubmitting(true);

      try {
        const res = await method(...arg);
        setData(res);

        return { data: res };
      } catch (e) {
        console.log("Mutate error", e.errors || e);

        setError(e);

        return { error: e };
      } finally {
        setIsSubmitting(false);
      }
    },
    [method]
  );

  return {
    action,
    error,
    data,
    isSubmitting,
  };
};

export const Hook = ({ hookKey }) => {
  useHook(hookKey);

  return null;
};

export const Inject = ({ hookKey, children }) => {
  const props = useHook(hookKey);

  return React.cloneElement(children, props);
};
