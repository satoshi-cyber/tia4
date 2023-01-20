import SecondaryButton from '@/components/SecondaryButton';
import { URLS } from '@/config';
import Link from 'next/link';
import { Gothic_A1 } from '@next/font/google';

const gothic = Gothic_A1({
  subsets: ['latin'],
  weight: ['100', '400'],
  display: 'swap',
});

import { LayoutProps } from '../Layout-types';

import Logo from '../../../public/logo.svg';

const Landing: React.FC<LayoutProps> = ({ children }) => (
  <div
    className={`flex flex-1 flex-col w-full items-center pt-36 ${gothic.className}`}
  >
    <div className="absolute top-0 left-0 p-4 md:p-6 flex flex-row justify-between w-full">
      <Logo className="" width={120} />
      <Link href={URLS.LOGIN}>
        <SecondaryButton title="Login / Signup" />
      </Link>
    </div>
    <div className="max-w-[1024px] p-4 md:p-6">{children}</div>
    <footer className="bg-gray-100 py-0 w-full">
      <div className="container">
        <div className="flex flex-row justify-between items-center min-h-[60px]">
          <div className="w-1/2 p-4 md:p-6">
            <a
              className="text-black text-md no-underline mr-3"
              href="/privacy"
              target="_blank"
            >
              Privacy
            </a>
            <a
              className="text-black text-md no-underline"
              href="/terms"
              target="_blank"
            >
              Terms
            </a>
          </div>
          <p className="text-right text-xs absolute right-4 md:right-6">
            © All right's Reserved. The Interview 2023
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Landing;
