import { Icon, Layout, Markdown, Title } from '@/components';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { cs } from 'date-fns/locale';
import { POLICY_BODY } from '../privacy-policy';
import { TERMS_BODY } from '../terms';

const recordDemo = () => (
  <Layout.Default>
    <Title
      title="Help and support"
      subTitle="Learn how to manage and control your privacy"
    />
    <div className="w-full pt-8">
      <div className="mx-auto w-full rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="transition-all flex w-full items-center justify-between rounded-lg border p-4 text-left text-md text-gray-600 hover:border-purple-200 hover:text-purple-800 focus:outline-none">
                <span>Privacy Policy</span>
                <Icon
                  size={30}
                  name="HiChevronDown"
                  className={clsx(
                    'transition-all',
                    open && 'rotate-180 transform'
                  )}
                />
              </Disclosure.Button>
              <div
                className={clsx(
                  'transition-all overflow-hidden duration-500',
                  open ? 'max-h-[3000px]' : 'max-h-[0px]'
                )}
              >
                <Disclosure.Panel static>
                  <div className="p-4">
                    <Markdown text={POLICY_BODY} />
                  </div>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="transition-all flex w-full items-center justify-between rounded-lg border p-4 text-left text-md text-gray-600 hover:border-purple-200 hover:text-purple-800 focus:outline-none">
                <span>Terms and conditions</span>
                <Icon
                  size={30}
                  name="HiChevronDown"
                  className={clsx(
                    'transition-all ',
                    open && 'rotate-180 transform'
                  )}
                />
              </Disclosure.Button>
              <div
                className={clsx(
                  'transition-all overflow-hidden duration-500',
                  open ? 'max-h-[3000px]' : 'max-h-[0px]'
                )}
              >
                <Disclosure.Panel static>
                  <div className="p-4">
                    <Markdown text={TERMS_BODY} />
                  </div>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  </Layout.Default>
);

export default recordDemo;
