import { ButtonIcon, Avatar, Title, LoadingProvider } from '@/components';
import { URLS } from '@/config';
import Link from 'next/link';
import { useCompanyHeader } from './Header-hook';

const Header = () => {
  const { fetching, title, avatar } = useCompanyHeader();

  return (
    <LoadingProvider isLoading={fetching}>
      <Avatar src={avatar} size={60} className="border mb-4" />
      <Title
        title={title}
        skeletonProps={{ width: 120 }}
        subTitleSkeletonProps={{ width: 280 }}
        subTitle="Edit your company, and invite new members!"
        after={
          <Link href={URLS.EDIT_COMPANY}>
            <ButtonIcon name="HiCog" />
          </Link>
        }
      />
    </LoadingProvider>
  );
};

export default Header;
