import Layout from '@/components/Layout/Landing';
import Head from 'next/head';

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
        <header lang="en" />
        <title>The Interview</title>
        <meta name="description" content="Revolutionize the way you hire" />
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
