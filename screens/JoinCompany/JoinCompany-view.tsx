import {
  Avatar,
  Title,
  LoadingProvider,
  Layout,
  PrimaryButton,
  Loader,
} from '@/components';

import { BUTTON_PROPS, TITLE_PROPS } from './JoinCompany-constants';
import { useJoinCompany } from './JoinCompany-hook';

const JoinCompany = () => {
  const { isLoading, title, avatar, submitting, handleJoinCompany } =
    useJoinCompany();

  return (
    <Layout.Default>
      {submitting && <Loader />}
      <LoadingProvider isLoading={isLoading}>
        <Avatar src={avatar} size={60} className="border mb-4" />
        <Title {...TITLE_PROPS} title={title} />
        <div>
          <PrimaryButton {...BUTTON_PROPS} onClick={handleJoinCompany} />
        </div>
      </LoadingProvider>
    </Layout.Default>
  );
};

export default JoinCompany;
