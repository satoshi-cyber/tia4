import ActiveLink from '@/components/ActiveLink';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import LoadingProvider from '@/context/LoadingProvider';
import { URLS } from '@/config';

import { useCompany } from './Company-hook';

const Company = () => {
  const { isLoading, title } = useCompany();

  return (
    <LoadingProvider isLoading={isLoading}>
      <ActiveLink href={URLS.COMPANY} shallow>
        <a className="text-md pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group/link hover:text-gray-800 cursor-pointer transition-all border-r-2 border-r-transparent data-[active=true]:border-purple-800">
          <Icon
            isLoading={false}
            name="HiOfficeBuilding"
            size={28}
            className="m-0.5 group-data-[active=true]/link:text-purple-800 text-gray-500 group-hover/link:text-purple-800 flex-none transition-all"
          />
          <span className="ml-5 transition-all absolute w-[190px] left-[40px] md:left-[69px] group-hover:left-[40px] flex flex-row items-center">
            <Text
              className="flex flex-1"
              text={title}
              skeletonProps={{ width: 90 }}
            />
            {/* <button className="border-l mx-4 p-2 text-gray-500 hover:text-purple-800">
                    <Icon name="HiSwitchVertical" size={16} />
                  </button> */}
          </span>
        </a>
      </ActiveLink>
    </LoadingProvider>
  );
};

export default Company;
