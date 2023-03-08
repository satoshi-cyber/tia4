import { useForm } from 'react-hook-form';
import { Form, Field, PrimaryButton } from '@/components';
import Dialog from '@/components/Dialog';
import { useState } from 'react';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import clsx from 'clsx';

const PostWithAI: React.FC = () => {
  const [display, setDisplay] = useState('block');
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [60, 80], [1, 0]);

  useMotionValueEvent(opacity, 'change', (value) => {
    if (value === 0) {
      setDisplay('hidden');
      return;
    }

    setDisplay('block');
  });

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm();

  const onSubmit = () => {};

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => setIsOpen(false);

  return (
    <motion.div
      style={{ opacity }}
      className={clsx(
        display,
        'fixed bottom-0 right-0 backdrop-blur-2xl z-50 border border-gray-200 p-6'
      )}
    >
      <Form form={form} onSubmit={onSubmit}>
        <Dialog
          isOpen={isOpen}
          onClose={closeDialog}
          onConfirm={closeDialog}
          title="Coming soon!"
          confirm="OK"
          showCancel={false}
        >
          Introducing our upcoming AI feature: create job posts effortlessly.
          Simply input the job title and required skills, and let our system
          generate an informative, accurate, and easy-to-understand job post.
          With this feature, you can streamline your recruitment process, save
          time, and attract a more qualified pool of candidates. Stay tuned for
          the official release of this game-changing feature.
        </Dialog>

        <Field.TextArea
          label="Prompt"
          placeholder="Job title and required skills"
          name="prompt"
        />
        <div className="flex flex-1 justify-center">
          <PrimaryButton
            title="Create job post with AI"
            className="w-auto"
            onClick={openDialog}
          />
        </div>
      </Form>
    </motion.div>
  );
};

export default PostWithAI;
