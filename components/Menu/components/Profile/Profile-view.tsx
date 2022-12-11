import Link from 'next/link'

import { Text, Icon, Avatar, LoadingProvider } from '@/components'

import { useProfile } from './Profile-hook'

const Profile = () => {
  const { handleLogout, label, loading, avatarUrl } = useProfile()

  return (
    <LoadingProvider isLoading={loading}>
      <Link
        href="/profile"
        className="pl-5 py-2 mb-3 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer"
      >
        <Avatar name={label} size="30" src={avatarUrl} />
        <span className="ml-5 transition-all ease-in-out absolute w-[190px] left-[69px] group-hover:left-[40px] flex flex-row items-center">
          <Text
            className="flex flex-1"
            skeletonProps={{ width: '100' }}
            text={label}
          />
          <button
            className="border-l mx-4 p-2 text-gray-500 hover:text-purple-800"
            onClick={handleLogout}
          >
            <Icon name="HiOutlineLogout" size={16} isLoading={false} />
          </button>
        </span>
      </Link>
    </LoadingProvider>
  )
}

export default Profile
