import { Layout } from '@/components';

import { Header, Description, Mobile } from './components';

const Landing: React.FC = () => (
  <Layout.Landing>
    <div className="grid grid-cols-1 gap-20">
      <Header />
      <Description />
      <Mobile />
    </div>
  </Layout.Landing>
);

export default Landing;
