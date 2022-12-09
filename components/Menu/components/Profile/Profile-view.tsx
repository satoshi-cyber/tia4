import Link from 'next/link'

import { Text, Icon, Avatar, LoadingProvider } from '@/components'

import { useProfile } from './Profile-hook'

const Profile = () => {
  const { handleLogout, label, loading } = useProfile()

  return (
    <LoadingProvider isLoading={loading}>
      <Link href="/profile">
        <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-gray-800 cursor-pointer">
          <Avatar name={label} size="30" />
          <Text
            skeletonProps={{ width: '100' }}
            className="ml-5 group-hover:ml-3 transition-all ease-in-out flex-1 truncate"
            text={label}
          />
          <button
            className="border-l rounded-full mx-2 p-2 text-gray-500 hover:text-purple-800"
            onClick={handleLogout}
          >
            <Icon name="HiOutlineLogout" size={14} isLoading={false} />
          </button>
        </a>
      </Link>
    </LoadingProvider>
  )
}

export default Profile
