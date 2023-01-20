import { Layout } from '@/components';

const Landing: React.FC = () => (
  <Layout.Landing>
    <div className={`flex flex-col md:flex-row mb-0 md:mb-6`}>
      <p className={`text-left text-2xl font-thin pb-2 md:w-1/6`}>
        Say <span className={`text-4xl font-normal `}>goodbye</span> to endless
        resumes and in-person interviews, and{' '}
        <span className={`text-4xl font-normal `}>hello</span> to a smarter,
        more efficient way
      </p>
      <div className={`my-16 scale-125 md:scale-100 md:my-0 md:w-5/6 `}>
        <img src="/mac.svg" alt="Mac computer" />
      </div>
    </div>
  </Layout.Landing>
);

export default Landing;
