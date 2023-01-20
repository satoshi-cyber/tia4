import { PrimaryButton } from '@/components';
import { URLS } from '@/config';
import Link from 'next/link';

const Cta: React.FC = () => (
  <div className="container mx-auto flex flex-col justify-center items-center mb-24">
    <div className="text-center max-w-[300px]">
      <h5 className="font-light text-3xl mb-8">
        Experience the power of The Interview
      </h5>
    </div>
    <div>
      <Link href={URLS.LOGIN}>
        <PrimaryButton title="Signup now" />
      </Link>
    </div>
  </div>
);

export default Cta;
