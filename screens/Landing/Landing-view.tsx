import { Layout } from '@/components';

import {
  Header,
  Description,
  Mobile,
  Security,
  Testimonials,
  Cta,
} from './components';

const Landing: React.FC = () => (
  <Layout.Landing>
    <div className="grid grid-cols-1 gap-20">
      <Header />
      <Description />
      <Mobile />
      <Security />
      <Testimonials />
      <Cta />
    </div>
  </Layout.Landing>
);

export default Landing;

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
