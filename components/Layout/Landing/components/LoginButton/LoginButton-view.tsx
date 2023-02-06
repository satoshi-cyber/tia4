import SecondaryButton from '@/components/SecondaryButton';
import { URLS } from '@/config';
import { useUser } from '@/hooks';
import Link from 'next/link';

const LoginButton: React.FC = () => {
  const { isUserLoggedin } = useUser();

  return (
    <Link href={URLS.HOME} prefetch={false}>
      {isUserLoggedin ? (
        <SecondaryButton title="Go to App" />
      ) : (
        <SecondaryButton title="Login / Signup" />
      )}
    </Link>
  );
};

export default LoginButton;
