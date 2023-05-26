import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type FormProps<D extends z.AnyZodObject, T extends z.infer<D>> =
  | {
      onSubmit: (data: T) => void;
      form: UseFormReturn<T>;
      children: React.ReactNode;
      className?: string;
      isLoading?: boolean;
    }
  | {
      onSubmit: (
        data: T,
        { reset }: { reset: (data: DeepPartial<DeepNullable<T>>) => void }
      ) => void;
      schema: D;
      data?: DeepPartial<DeepNullable<T>>;
      defaultData?: DeepPartial<DeepNullable<T>>;
      children: React.ReactNode;
      className?: string;
      isLoading?: boolean;
    };

export type FormSubmit<T extends z.AnyZodObject> = (
  data: z.infer<T>,
  { reset }: { reset: (data: DeepPartial<DeepNullable<z.infer<T>>>) => void }
) => void;
