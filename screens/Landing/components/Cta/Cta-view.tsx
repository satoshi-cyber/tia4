import PrimaryButton from '@/components/PrimaryButton';
import { URLS } from '@/config';
import Link from 'next/link';

const Cta: React.FC = () => (
  <div className="container mx-auto flex flex-col justify-center items-center">
    <div className="text-center max-w-[300px]">
      <p className="text-2xl font-light mb-8">
        Experience the power
        <br /> of The Interview
      </p>
    </div>
    <div>
      <Link href={URLS.LOGIN} prefetch={false}>
        <PrimaryButton title="Signup now" className="mb-4" />
      </Link>
    </div>
  </div>
);

export default Cta;
