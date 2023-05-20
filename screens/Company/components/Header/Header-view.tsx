import { ButtonIcon, Avatar, Title, LoadingProvider } from '@/components';
import { URLS } from '@/config';
import Link from 'next/link';
import { useCompanyHeader } from './Header-hook';

const Header = ({
  onClose,
  isAdmin,
}: {
  onClose?: () => void;
  isAdmin: boolean;
}) => {
  const { isLoading, title, avatar } = useCompanyHeader();

  return (
    <LoadingProvider isLoading={isLoading}>
      <Avatar src={avatar} size={60} className="mb-4" />
      <Title
        title={title}
        skeletonProps={{ width: 120 }}
        subTitleSkeletonProps={{ width: 280 }}
        subTitle="The Interview works better with a team!"
        before={
          onClose && <ButtonIcon name="HiChevronLeft" onClick={onClose} />
        }
        after={
          isAdmin && (
            <Link href={URLS.EDIT_COMPANY}>
              <ButtonIcon name="HiCog" />
            </Link>
          )
        }
      />
    </LoadingProvider>
  );
};

export default Header;
