import { Title } from '@/components';

import { SettingsMenu } from './components';
import { CLASS_NAMES } from './Header-constants';
import { useHeader } from './Header-hook';
import { HeaderProps } from './Header-types';

export const Header: React.FC<HeaderProps> = ({ editJob, handleDeleteJob }) => {
  const { title, titleProps } = useHeader({ editJob });

  return (
    <div className={CLASS_NAMES.container}>
      <Title title={title} {...titleProps} />
      {editJob && <SettingsMenu handleDeleteJob={handleDeleteJob} />}
    </div>
  );
};

export default Header;
