import Text from '@/components/Text';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';
import LoadingProvider from '@/components/LoadingProvider';
import ActiveLink from '@/components/ActiveLink';

import { URLS } from '@/config';

import { useProfile } from './Profile-hook';

const Profile = () => {
  const { handleLogout, label, isLoading, avatarUrl } = useProfile();

  return (
    <LoadingProvider isLoading={isLoading}>
      <ActiveLink href={URLS.PROFILE}>
        <a className="text-md pl-5 py-1 mb-3 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer transition-all ease-in-out border-r-2 border-r-transparent data-[active=true]:border-purple-800 ">
          <Avatar text={label} size={30} src={avatarUrl} />
          <span className="ml-5 transition-all ease-in-out absolute w-full md:w-[196px] left-0 md:left-[69px] group-hover:left-[40px] flex flex-row items-center">
            <Text
              className="flex flex-1 pl-10 md:pl-0"
              skeletonProps={{ width: 100 }}
              text={label}
            />
            <button
              className="border-l mx-8 md:mx-4 px-3 py-1 text-gray-500 hover:text-purple-800"
              onClick={handleLogout}
            >
              <Icon name="HiOutlineLogout" size={16} isLoading={false} />
            </button>
          </span>
        </a>
      </ActiveLink>
    </LoadingProvider>
  );
};

export default Profile;
