import React from "react";
import { useCallback } from "react";
import { unstable_serialize } from "swr";
import useSWRImmutable from "swr/immutable";
import { Store } from "pullstate";

let hooks = {};

export const ActionStore = new Store({});

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

  const serializedKey = unstable_serialize(key);

  const action = useCallback(
    async (...arg) => {
      try {
        ActionStore.update((s) => {
          s[serializedKey] = {
            isSubmitting: true,
            error: undefined,
            data: undefined,
          };
        });

        const res = await method(...arg);

        ActionStore.update((s) => {
          s[serializedKey] = {
            isSubmitting: false,
            error: undefined,
            data: res,
          };
        });

        return { data: res };
      } catch (e) {
        console.log("Mutate error", e.errors || e);

        ActionStore.update((s) => {
          s[serializedKey] = {
            isSubmitting: false,
            error: e,
            data: null,
          };
        });

        return { error: e };
      } finally {
      }
    },
    [serializedKey, method]
  );

  return action;
};

export const defaultActionFlags = {
  isSubmitting: false,
  error: null,
  data: undefined,
};

export const useActionState = (key) => {
  const data = ActionStore.useState((s) => s[unstable_serialize(key)]);

  return data || defaultActionFlags;
};

export const useMergedActionState = (keys) => {
  const serializedKey = keys.map((key) => unstable_serialize(key));

  const data = ActionStore.useState((s) =>
    serializedKey
      .map((key) => s[key] || defaultActionFlags)
      .reduce(({ isSubmitting, error }, item) => {
        return {
          isSubmitting: isSubmitting || item.isSubmitting,
          error: error || item.error,
        };
      }, defaultActionFlags)
  );

  return data;
};

export const Hook = ({ hookKey, children }) => {
  const props = useHook(hookKey);

  return children ? children(props) : null;
};

export const InjectHook = ({ hookKey, children }) => {
  const props = useHook(hookKey);

  return React.cloneElement(children, props);
};

export const Action = ({ hookKey, children, disabled }) => {
  const action = useAction(hookKey);
  const { isSubmitting, error } = useActionState(hookKey);

  return React.cloneElement(children, {
    disabled: disabled || isSubmitting,
    error: error,
    onClick: action,
  });
};

export const MergedActionState = ({ hookKeys, children }) => {
  const { isSubmitting, error } = useMergedActionState(hookKeys);

  return children({ isSubmitting, error });
};
