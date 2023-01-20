import Layout from '@/components/Layout/Landing';

import {
  Header,
  Description,
  Mobile,
  Security,
  Testimonials,
  Cta,
} from './components';

const Landing: React.FC = () => (
  <Layout>
    <div className="grid grid-cols-1 gap-20">
      <Header />
      <Description />
      <Mobile />
      <Security />
      <Testimonials />
      <Cta />
    </div>
  </Layout>
);

export default Landing;
