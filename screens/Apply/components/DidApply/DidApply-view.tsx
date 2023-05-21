import { URLS } from '@/config';
import Link from 'next/link';
import PrimaryButton from '@/components/PrimaryButton';
import Text from '@/components/Text';

import { TITLE, CLASS_NAMES, BUTTON_PROPS } from './DidApply-constants';

const DidApply = () => (
  <div className={CLASS_NAMES.container}>
    <Text className={CLASS_NAMES.text} text={TITLE} />
    <Link href={URLS.MY_INTERVIEWS}>
      <PrimaryButton {...BUTTON_PROPS} />
    </Link>
  </div>
);

export default DidApply;
