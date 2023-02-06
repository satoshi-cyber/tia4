import PrimaryButton from '@/components/PrimaryButton';
import { URLS } from '@/config';
import Link from 'next/link';

const Cta: React.FC = () => (
  <div className="container mx-auto flex flex-col justify-center items-center">
    <div className="text-center max-w-[300px]">
      <p className="font-thin text-3xl mb-8">
        Experience the power of The Interview
      </p>
    </div>
    <div>
      <Link href={URLS.LOGIN} prefetch={false}>
        <PrimaryButton title="Signup now" className="mb-4" />
      </Link>
      <p className=" text-md mb-8">No credit card required.</p>
    </div>
  </div>
);

export default Cta;
