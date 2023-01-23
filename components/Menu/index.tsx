import { useUser } from '@/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Profile from './components/Profile';

import LogoText from '../../public/logo-text.svg';

import Icon from '../Icon/Icon-view';
import ActiveLink from '../ActiveLink';
import { useId, useState } from 'react';
import { URLS } from '@/config';
import dynamic from 'next/dynamic';
import ButtonIcon from '../ButtonIcon';
import clsx from 'clsx';

const LogoSmall = ({
  width,
  className,
}: {
  width: number;
  className?: string;
}) => {
  const id = useId();

  return (
    <svg
      width={width}
      height="44px"
      viewBox="0 0 147 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          x1="50%"
          y1="2.98372438e-14%"
          x2="50%"
          y2="99.7332661%"
          id={id}
        >
          <stop stop-color="#6B46C1" offset="0%"></stop>
          <stop stop-color="#44337A" offset="0.0655594406%"></stop>
          <stop stop-color="#A755F6" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Medium" transform="translate(-32.000000, -32.000000)">
          <g
            id="Logo"
            transform="translate(32.000000, 32.000000)"
            fill-rule="nonzero"
          >
            <path
              d="M16.5,0 C21.186587,0 24.9858165,3.8085074 24.9858165,8.50653936 C24.9858165,10.8448643 24.0446351,12.9628277 22.5213092,14.5005161 L31.3430413,23.344158 C33.5523196,25.5588315 33.5523196,29.1495267 31.3430413,31.3642002 L20.3949825,42.3389949 C18.1857041,44.5536684 14.6037563,44.5536684 12.3944779,42.3389949 L1.65695874,31.575254 C-0.552319579,29.3605805 -0.552319579,25.7698853 1.65695874,23.5552118 L10.5846698,14.6056426 C8.99913639,13.060092 8.01418351,10.8986206 8.01418351,8.50653936 C8.01418351,3.8085074 11.813413,0 16.5,0 Z"
              fill={`url(#${id})`}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
const Logo = ({ width, className }: { width: number; className?: string }) => {
  const id = useId();

  return (
    <svg
      width={width}
      height="44px"
      viewBox="0 0 147 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          x1="50%"
          y1="2.98372438e-14%"
          x2="50%"
          y2="99.7332661%"
          id={id}
        >
          <stop stop-color="#6B46C1" offset="0%"></stop>
          <stop stop-color="#44337A" offset="0.0655594406%"></stop>
          <stop stop-color="#A755F6" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Medium" transform="translate(-32.000000, -32.000000)">
          <g
            id="Logo"
            transform="translate(32.000000, 32.000000)"
            fill-rule="nonzero"
          >
            <path
              d="M16.5,0 C21.186587,0 24.9858165,3.8085074 24.9858165,8.50653936 C24.9858165,10.8448643 24.0446351,12.9628277 22.5213092,14.5005161 L31.3430413,23.344158 C33.5523196,25.5588315 33.5523196,29.1495267 31.3430413,31.3642002 L20.3949825,42.3389949 C18.1857041,44.5536684 14.6037563,44.5536684 12.3944779,42.3389949 L1.65695874,31.575254 C-0.552319579,29.3605805 -0.552319579,25.7698853 1.65695874,23.5552118 L10.5846698,14.6056426 C8.99913639,13.060092 8.01418351,10.8986206 8.01418351,8.50653936 C8.01418351,3.8085074 11.813413,0 16.5,0 Z"
              id="Combined-Shape"
              fill={`url(#${id})`}
            ></path>
            <g
              id="THE-INTERVIEW"
              transform="translate(41.792000, 5.310000)"
              fill="#44337A"
            >
              <path
                d="M4.32,12.06 C4.32,12.456 4.644,12.78 5.04,12.78 C5.436,12.78 5.76,12.456 5.76,12.06 L5.76,1.404 L9.414,1.404 C9.774,1.404 10.08,1.116 10.08,0.756 C10.08,0.396 9.774,0.09 9.414,0.09 L0.666,0.09 C0.306,0.09 0,0.396 0,0.756 C0,1.116 0.306,1.404 0.666,1.404 L4.32,1.404 L4.32,12.06 Z"
                id="Path"
              ></path>
              <path
                d="M12.654,12.06 C12.654,12.456 12.978,12.78 13.356,12.78 C13.752,12.78 14.076,12.456 14.076,12.06 L14.076,7.02 L21.348,7.02 L21.348,12.06 C21.348,12.456 21.672,12.78 22.068,12.78 C22.446,12.78 22.77,12.456 22.77,12.06 L22.77,0.72 C22.77,0.324 22.446,0 22.068,0 C21.672,0 21.348,0.324 21.348,0.72 L21.348,5.688 L14.076,5.688 L14.076,0.72 C14.076,0.324 13.752,0 13.356,0 C12.978,0 12.654,0.324 12.654,0.72 L12.654,12.06 Z"
                id="Path"
              ></path>
              <path
                d="M27.036,12.69 L34.956,12.69 C35.316,12.69 35.604,12.402 35.604,12.042 C35.604,11.682 35.316,11.394 34.956,11.394 L27.756,11.394 L27.756,6.984 L34.056,6.984 C34.416,6.984 34.704,6.696 34.704,6.336 C34.704,5.994 34.416,5.688 34.056,5.688 L27.756,5.688 L27.756,1.386 L34.866,1.386 C35.226,1.386 35.514,1.098 35.514,0.738 C35.514,0.378 35.226,0.09 34.866,0.09 L27.036,0.09 C26.658,0.09 26.334,0.414 26.334,0.81 L26.334,11.97 C26.334,12.366 26.658,12.69 27.036,12.69 Z"
                id="Path"
              ></path>
              <path
                d="M1.116,30.06 C1.116,30.456 1.44,30.78 1.818,30.78 C2.214,30.78 2.538,30.456 2.538,30.06 L2.538,18.72 C2.538,18.324 2.214,18 1.818,18 C1.44,18 1.116,18.324 1.116,18.72 L1.116,30.06 Z"
                id="Path"
              ></path>
              <path
                d="M6.228,30.078 C6.228,30.456 6.534,30.78 6.912,30.78 C7.308,30.78 7.614,30.456 7.614,30.078 L7.614,20.322 L15.426,30.312 C15.642,30.564 15.858,30.744 16.164,30.744 L16.236,30.744 C16.614,30.744 16.884,30.456 16.884,30.078 L16.884,18.702 C16.884,18.324 16.578,18 16.2,18 C15.804,18 15.498,18.324 15.498,18.702 L15.498,28.206 L7.848,18.45 C7.65,18.198 7.452,18.036 7.128,18.036 L6.93,18.036 C6.552,18.036 6.228,18.36 6.228,18.738 L6.228,30.078 Z"
                id="Path"
              ></path>
              <path
                d="M23.778,30.06 C23.778,30.456 24.102,30.78 24.498,30.78 C24.894,30.78 25.218,30.456 25.218,30.06 L25.218,19.404 L28.872,19.404 C29.232,19.404 29.538,19.116 29.538,18.756 C29.538,18.396 29.232,18.09 28.872,18.09 L20.124,18.09 C19.764,18.09 19.458,18.396 19.458,18.756 C19.458,19.116 19.764,19.404 20.124,19.404 L23.778,19.404 L23.778,30.06 Z"
                id="Path"
              ></path>
              <path
                d="M32.814,30.69 L40.734,30.69 C41.094,30.69 41.382,30.402 41.382,30.042 C41.382,29.682 41.094,29.394 40.734,29.394 L33.534,29.394 L33.534,24.984 L39.834,24.984 C40.194,24.984 40.482,24.696 40.482,24.336 C40.482,23.994 40.194,23.688 39.834,23.688 L33.534,23.688 L33.534,19.386 L40.644,19.386 C41.004,19.386 41.292,19.098 41.292,18.738 C41.292,18.378 41.004,18.09 40.644,18.09 L32.814,18.09 C32.436,18.09 32.112,18.414 32.112,18.81 L32.112,29.97 C32.112,30.366 32.436,30.69 32.814,30.69 Z"
                id="Path"
              ></path>
              <path
                d="M44.172,30.06 C44.172,30.456 44.496,30.78 44.874,30.78 C45.27,30.78 45.594,30.456 45.594,30.06 L45.594,25.794 L49.212,25.794 L52.758,30.402 C52.92,30.618 53.136,30.78 53.424,30.78 C53.784,30.78 54.144,30.456 54.144,30.078 C54.144,29.88 54.054,29.718 53.91,29.556 L50.778,25.524 C52.74,25.146 54.144,23.94 54.144,21.87 L54.144,21.834 C54.144,20.844 53.784,19.962 53.172,19.35 C52.38,18.558 51.138,18.09 49.59,18.09 L44.874,18.09 C44.496,18.09 44.172,18.414 44.172,18.81 L44.172,30.06 Z M45.594,24.516 L45.594,19.404 L49.482,19.404 C51.516,19.404 52.704,20.34 52.704,21.888 L52.704,21.924 C52.704,23.544 51.354,24.516 49.464,24.516 L45.594,24.516 Z"
                id="Shape"
              ></path>
              <path
                d="M61.758,30.834 L61.83,30.834 C62.244,30.834 62.496,30.6 62.658,30.24 L67.536,18.972 C67.572,18.882 67.59,18.792 67.59,18.684 C67.59,18.324 67.284,18 66.888,18 C66.564,18 66.312,18.252 66.186,18.504 L61.812,28.98 L57.456,18.54 C57.33,18.234 57.078,18 56.718,18 C56.322,18 55.998,18.342 55.998,18.702 C55.998,18.828 56.016,18.918 56.07,19.026 L60.93,30.24 C61.074,30.6 61.344,30.834 61.758,30.834 Z"
                id="Path"
              ></path>
              <path
                d="M70.398,30.06 C70.398,30.456 70.722,30.78 71.1,30.78 C71.496,30.78 71.82,30.456 71.82,30.06 L71.82,18.72 C71.82,18.324 71.496,18 71.1,18 C70.722,18 70.398,18.324 70.398,18.72 L70.398,30.06 Z"
                id="Path"
              ></path>
              <path
                d="M76.212,30.69 L84.132,30.69 C84.492,30.69 84.78,30.402 84.78,30.042 C84.78,29.682 84.492,29.394 84.132,29.394 L76.932,29.394 L76.932,24.984 L83.232,24.984 C83.592,24.984 83.88,24.696 83.88,24.336 C83.88,23.994 83.592,23.688 83.232,23.688 L76.932,23.688 L76.932,19.386 L84.042,19.386 C84.402,19.386 84.69,19.098 84.69,18.738 C84.69,18.378 84.402,18.09 84.042,18.09 L76.212,18.09 C75.834,18.09 75.51,18.414 75.51,18.81 L75.51,29.97 C75.51,30.366 75.834,30.69 76.212,30.69 Z"
                id="Path"
              ></path>
              <path
                d="M90.846,30.24 C90.972,30.618 91.224,30.852 91.584,30.852 L91.692,30.852 C92.052,30.852 92.304,30.6 92.43,30.24 L95.688,20.556 L98.964,30.24 C99.09,30.6 99.342,30.852 99.702,30.852 L99.81,30.852 C100.17,30.852 100.422,30.6 100.548,30.24 L104.58,19.044 C104.616,18.936 104.67,18.81 104.67,18.702 C104.67,18.342 104.328,18 103.95,18 C103.608,18 103.374,18.234 103.266,18.558 L99.774,28.602 L96.48,18.558 C96.372,18.234 96.138,18 95.778,18 L95.688,18 C95.31,18 95.094,18.234 94.986,18.558 L91.692,28.602 L88.218,18.594 C88.11,18.27 87.84,18 87.48,18 C87.084,18 86.742,18.342 86.742,18.72 C86.742,18.828 86.778,18.936 86.814,19.044 L90.846,30.24 Z"
                id="Path"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const MenuItems = () => {
  const { hasCompany } = useUser();

  return (
    <div className="w-full flex flex-1 flex-col pt-28 h-full">
      {hasCompany ? (
        <>
          <ActiveLink href={URLS.JOBS} shallow>
            <a className="pl-4 md:pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiPlusCircle"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
              />
              <span className="ml-5 transition-all absolute w-[240px] left-10 md:left-[69px] group-hover:left-[40px]">
                Jobs
              </span>
            </a>
          </ActiveLink>
          <ActiveLink href={URLS.RATE} shallow>
            <a className="pl-4 md:pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiPlay"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
              />
              <span className="ml-5 transition-all absolute w-[240px] left-10 md:left-[69px] group-hover:left-[40px]">
                Rate
              </span>
            </a>
          </ActiveLink>
          <ActiveLink href={URLS.CANDIDATES} shallow>
            <a className="pl-4 md:pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiUsers"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
              />
              <span className="ml-5 transition-all absolute w-[240px] left-10 md:left-[69px] group-hover:left-[40px]">
                Candidates
              </span>
            </a>
          </ActiveLink>
          {/* <ActiveLink href={URLS.FLOW} shallow>
                <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
                  <Icon
                    name="HiFilter"
                    size={30}
                    className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800"
                  />
                  <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                    Flow
                  </span>
                </a>
              </ActiveLink> */}
          <ActiveLink href={URLS.COMPANY} shallow>
            <a className="pl-4 md:pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiOfficeBuilding"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
              />
              <span className="ml-5 transition-all absolute w-[190px] left-10 md:left-[69px] group-hover:left-[40px] flex flex-row items-center">
                <span className="flex flex-1">Lorem LLC</span>
                {/* <button className="border-l mx-4 p-2 text-gray-500 hover:text-purple-800">
                    <Icon name="HiSwitchVertical" size={16} />
                  </button> */}
              </span>
            </a>
          </ActiveLink>
        </>
      ) : (
        <ActiveLink href={URLS.SETUP_COMPANY} shallow>
          <a className="pl-4 md:pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
            <Icon
              name="HiBriefcase"
              size={30}
              className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
            />
            <span className="ml-5 transition-all absolute w-[240px] left-10 md:left-[69px] group-hover:left-[40px]">
              Post a job
            </span>
          </a>
        </ActiveLink>
      )}
      <hr className="mb-4" />
      <ActiveLink href={URLS.MY_INTERVIEWS} shallow>
        <a className="pl-4 md:pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
          <Icon
            name="HiUserCircle"
            size={30}
            className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
          />
          <span className="ml-5 transition-all absolute w-[240px] left-10 md:left-[69px] group-hover:left-[40px]">
            My Interviews
          </span>
        </a>
      </ActiveLink>
      {/* <ActiveLink href={URLS.RECORD_AN_INTERVIEW} shallow>
            <a className="pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
              <Icon
                name="HiVideoCamera"
                size={30}
                className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
              />
              <span className="ml-5 transition-all absolute w-[240px] left-[69px] group-hover:left-[40px]">
                Record
              </span>
            </a>
          </ActiveLink> */}
      <ActiveLink href={URLS.SUPPORT} shallow>
        <a className="pl-4 md:pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
          <Icon
            name="HiInformationCircle"
            size={30}
            className="group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
          />
          <span className="ml-5 transition-all absolute w-[240px] left-10 md:left-[69px] group-hover:left-[40px]">
            Help and support
          </span>
        </a>
      </ActiveLink>
      <div className="flex flex-1" />
      <Profile />
    </div>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={clsx(
        'transform-all duration-300 overflow-hidden fixed w-full bg-white md:hidden border-b border-gray z-20',
        isOpen ? 'h-[100vh]' : 'h-[80px]'
      )}
    >
      <div className="flex absolute top-0 left-0 w-full flex-row justify-between p-4 ">
        <Link href={URLS.HOME}>
          <Logo width={120} />
        </Link>
        <ButtonIcon name={isOpen ? 'HiX' : 'HiMenu'} onClick={toggleOpen} />
      </div>
      <MenuItems />
    </div>
  );
};

const Menu = () => {
  const { asPath } = useRouter();

  // TODO: fix with app dir update
  if (!asPath.startsWith('/app/')) return null;

  return (
    <>
      <MobileMenu />
      <div className="fixed left-0 top-0 min-h-full w-[70px] shadow-pixel flex flex-col transition-all hover:w-[240px] group overflow-hidden z-20 bg-white hover:shadow-pixelHover hidden md:flex">
        <Link href={URLS.HOME}>
          <LogoSmall className="absolute top-6 left-6 z-20" width={120} />
          <LogoText
            className="transition-all absolute top-6 left-6 z-20 left-[70px] group-hover:left-[24px]"
            width={120}
          />
        </Link>
        <MenuItems />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Menu), {
  ssr: false,
});
