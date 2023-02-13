import { Title, Layout } from '@/components';
import EmptyScreen from './components/EmptyScreen';

import { TITLE_PROPS } from './Rate-constants';

const Company = () => {
  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
      <EmptyScreen />
    </Layout.Default>
  );
};

export default Company;
