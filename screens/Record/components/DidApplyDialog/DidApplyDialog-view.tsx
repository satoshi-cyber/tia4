import { PrimaryButton, Text } from '@/components';
import { URLS } from '@/config';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';

import { BUTTON_PROPS, CLASS_NAMES, TITLE } from './DidApplyDialog-constants';

const DidApplyDialog: React.FC = () => {
  return (
    <Transition appear as={Fragment} show>
      <Dialog as="div" className="relative z-20" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-2xl" />
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
                <div className={CLASS_NAMES.container}>
                  <Text className={CLASS_NAMES.text} text={TITLE} />
                  <Link href={URLS.MY_INTERVIEWS}>
                    <PrimaryButton {...BUTTON_PROPS} />
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DidApplyDialog;
