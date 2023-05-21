import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import LoadingProvider from '@/context/LoadingProvider';
import Avatar from '@/components/Avatar';
import PrimaryButton from '@/components/PrimaryButton';
import Title from '@/components/Title';

import { BUTTON_PROPS, TITLE_PROPS } from './JoinCompany-constants';
import { useJoinCompany } from './JoinCompany-hook';

const JoinCompany = () => {
  const { isLoading, title, avatar, isMutating, handleJoinCompany } =
    useJoinCompany();

  return (
    <Layout.Default>
      {isMutating && <Loader />}
      <LoadingProvider isLoading={isLoading}>
        <Avatar src={avatar} size={60} className="mb-4" />
        <Title {...TITLE_PROPS} title={title} />
        <div>
          <PrimaryButton {...BUTTON_PROPS} onClick={handleJoinCompany} />
        </div>
      </LoadingProvider>
    </Layout.Default>
  );
};

export default JoinCompany;
