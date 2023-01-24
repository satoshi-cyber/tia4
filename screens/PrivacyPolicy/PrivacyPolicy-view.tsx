import Layout from '@/components/Layout/Landing';
import Markdown from '@/components/Markdown';

import { MARKDOWN } from './PrivacyPolicy-constants';

const PrivacyPolicy = () => (
  <Layout>
    <Markdown text={MARKDOWN} />
  </Layout>
);

export default PrivacyPolicy;
