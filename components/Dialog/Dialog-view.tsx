import { Dialog as BaseDialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

import { DialogProps } from './Dialog-types';

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirm,
  showCancel = true,
}) => {
  return ReactDOM.createPortal(
    <Transition appear show={isOpen} as={Fragment}>
      <BaseDialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <BaseDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ml-0 md:ml-[70px]">
                <BaseDialog.Title
                  as="h3"
                  className="text-2xl mb-4 font-medium leading-6 text-gray-900"
                >
                  {title}
                </BaseDialog.Title>
                <div className="mt-2 mb-6">
                  <p className="text-sm text-gray-500">{children}</p>
                </div>
                <div className="flex flex-row items-center">
                  <PrimaryButton
                    onClick={onConfirm}
                    title={confirm || 'Confirm'}
                  />
                  {showCancel && (
                    <SecondaryButton
                      className="ml-4"
                      onClick={onClose}
                      title="Cancel"
                      variant="cancel"
                    />
                  )}
                </div>
              </BaseDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </BaseDialog>
    </Transition>,
    document.getElementById('popups')!
  );
};

export default Dialog;
