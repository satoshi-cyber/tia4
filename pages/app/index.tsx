import { URLS } from '@/config';
import { withAuth } from '@/hocs';
import { useUser } from '@/hooks';
import Router from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const { hasCompany, claims } = useUser();

  useEffect(() => {
    if (!claims?.onboarded) {
      Router.replace(URLS.ONBOARDING);

      return;
    }

    if (hasCompany) {
      Router.replace(URLS.JOBS);

      return;
    }

    Router.replace(URLS.MY_INTERVIEWS);
  }, []);

  return null;
};

export default withAuth(Home);
