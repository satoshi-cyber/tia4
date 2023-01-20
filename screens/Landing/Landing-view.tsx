import Layout from '@/components/Layout/Landing';
import { Head } from 'next/document';

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
      <Head>
        <title>The Interview</title>
        <meta>Revolutionize the way you hire</meta>
      </Head>
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
