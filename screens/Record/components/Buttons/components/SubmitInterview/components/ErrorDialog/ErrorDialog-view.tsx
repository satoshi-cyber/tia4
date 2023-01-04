import { ButtonIcon, PrimaryButton } from '@/components';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { ErrorDialogProps } from './ErrorDialog-types';

const ErrorDialog: React.FC<ErrorDialogProps> = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[80vw] md:max-w-[400px] transform rounded-2xl backdrop-blur-2xl bg-black/10 p-6 text-left align-middle transition-all p-6 relative">
                <p className="text-xl md:text-2xl text-center text-white">
                  Please record some videos before you submit the interview
                </p>
                <PrimaryButton
                  title="OK"
                  onClick={closeModal}
                  className="mt-8"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorDialog;