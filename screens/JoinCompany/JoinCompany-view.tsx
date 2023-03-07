import {
  Avatar,
  Title,
  LoadingProvider,
  Layout,
  PrimaryButton,
} from '@/components';

import { BUTTON_PROPS, TITLE_PROPS } from './JoinCompany-constants';
import { useJoinCompany } from './JoinCompany-hook';

const JoinCompany = () => {
  const { fetching, title, avatar } = useJoinCompany();

  return (
    <Layout.Default>
      <LoadingProvider isLoading={fetching}>
        <Avatar src={avatar} size={60} className="border mb-4" />
        <Title {...TITLE_PROPS} title={title} />
        <div>
          <PrimaryButton {...BUTTON_PROPS} />
        </div>
      </LoadingProvider>
    </Layout.Default>
  );
};

export default JoinCompany;
