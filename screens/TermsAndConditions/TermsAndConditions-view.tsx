import Layout from '@/components/Layout/Landing';
import Markdown from '@/components/Markdown';

import { MARKDOWN } from './TermsAndConditions-constants';

const TermsAndConditions = () => (
  <Layout>
    <Markdown text={MARKDOWN} />
  </Layout>
);

export default TermsAndConditions;
