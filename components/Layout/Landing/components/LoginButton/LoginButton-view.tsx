import SecondaryButton from '@/components/SecondaryButton';
import { URLS } from '@/config';
import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';
import Link from 'next/link';

const LoginButton: React.FC = () => {
  const { isUserLoggedin } = useUser();

  const { data } = UseCases.health.load();

  return isUserLoggedin ? (
    <Link href={URLS.HOME} prefetch={false} data-test={data}>
      <SecondaryButton title="Go to app" />
    </Link>
  ) : (
    <Link href={URLS.LOGIN} prefetch={false} data-test={data}>
      <SecondaryButton title="Login / Signup" />
    </Link>
  );
};

export default LoginButton;
