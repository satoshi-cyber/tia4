import { useForm, useFormContext } from 'react-hook-form';
import { Form, Field, PrimaryButton, Spinner } from '@/components';

import { useEffect, useState } from 'react';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import useAi from '@/hooks/useAi';
import { DOMAIN } from '@/config';

const PostWithAI: React.FC<{ setDescription: (a: string) => void }> = ({
  setDescription,
}) => {
  const { setValue } = useFormContext();

  const [data, currentUrl, urlIndex, startStream, endStream] = useAi();

  const isMd = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const [display, setDisplay] = useState('block');
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [60, 80], [1, isMd ? 0 : 1]);

  useEffect(() => {
    if (urlIndex === 0) {
      setDescription(data as string);
      setValue('description', data, { shouldDirty: true });
    }

    if (urlIndex === 1) {
      setValue('title', data, { shouldDirty: true });
    }
  }, [urlIndex, data]);

  useMotionValueEvent(opacity, 'change', (value) => {
    if (value === 0) {
      setDisplay('hidden');
      return;
    }

    setDisplay('block');
  });

  const form = useForm();

  const onSubmit = () => {};

  const startAi = async () => {
    const res = await fetch(
      `${DOMAIN}/api/get-urls?q=${form.getValues().prompt}`
    );

    const urls = await res.json();

    startStream(urls);
  };

  return (
    <motion.div
      style={{ opacity }}
      className={clsx(
        display,
        'mb-6 md:mb-0 w-full md:w-auto md:fixed md:bottom-0 md:right-0 md:backdrop-blur-2xl z-50 md:border md:border-gray-200 md:p-6'
      )}
    >
      <Form form={form} onSubmit={onSubmit}>
        <Field.TextArea
          minRows={3}
          label="Long form?"
          placeholder="In just a few words write the key details of this job"
          name="prompt"
        />
        {currentUrl && (
          <div className="mb-6">
            <Spinner size={30} />
          </div>
        )}
        <div className="flex flex-1 justify-center">
          {currentUrl ? (
            <PrimaryButton
              title="Stop generating"
              className="w-auto"
              onClick={endStream}
            />
          ) : (
            <PrimaryButton
              title="Let AI assist you"
              className="w-auto"
              onClick={startAi}
            />
          )}
        </div>
      </Form>
    </motion.div>
  );
};

export default PostWithAI;
