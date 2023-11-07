import { URLS } from '@/config';
import Link from 'next/link';

import { LayoutProps } from '../Layout-types';

import Logo from '../../../public/logo.svg';
import LoginButton from './components/LoginButton';

const Landing: React.FC<LayoutProps> = ({ children }) => (
  <div className={`flex flex-1 flex-col w-full items-center pt-40`}>
    <div className="absolute top-0 left-0 p-6 flex flex-row justify-between w-full">
      <Link href={URLS.LANDING} prefetch={false} aria-label={'Home'}>
        <Logo className="" width={120} />
      </Link>
      <LoginButton />
    </div>
    <div className="w-full lg:w-[1024px] p-6">{children}</div>
    <div> Made with ❤️ in Prishtina</div>
    <footer className="bg-gray-100 py-0 w-full mt-20">
      <div className="container">
        <div className="flex flex-row justify-between items-center min-h-[60px]">
          <div className="w-1/2 p-6">
            <Link
              className="text-black text-md no-underline mr-3"
              href={URLS.PRIVACY_POLICY}
              prefetch={false}
            >
              Privacy
            </Link>
            <Link
              className="text-black text-md no-underline mr-3"
              href={URLS.TERMS_AND_CONDITIONS}
              prefetch={false}
            >
              Terms
            </Link>
          </div>
          <p className="text-right text-xs absolute right-4 md:right-6">
            © All right's Reserved.{' '}
            <a href="https://eightbits.us/">Eightbits LLC</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Landing;
