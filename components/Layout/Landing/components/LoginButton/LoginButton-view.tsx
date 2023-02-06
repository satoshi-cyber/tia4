import SecondaryButton from '@/components/SecondaryButton';
import { URLS } from '@/config';
import { useUser } from '@/hooks';
import Link from 'next/link';

const LoginButton: React.FC = () => {
  const { isUserLoggedin } = useUser();

  return isUserLoggedin ? (
    <Link href={URLS.HOME} prefetch={false}>
      <SecondaryButton title="Go to app" />
    </Link>
  ) : (
    <Link href={URLS.LOGIN} prefetch={false}>
      <SecondaryButton title="Login / Signup" />
    </Link>
  );
};

export default LoginButton;
