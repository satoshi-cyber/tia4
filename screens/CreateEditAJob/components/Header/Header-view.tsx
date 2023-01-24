import { Title } from '@/components';

import { SettingsMenu } from './components';
import { useHeader } from './Header-hook';
import { HeaderProps } from './Header-types';

export const Header: React.FC<HeaderProps> = ({ editJob, handleDeleteJob }) => {
  const { title, titleProps } = useHeader({ editJob });

  return (
    <Title
      title={title}
      {...titleProps}
      after={editJob && <SettingsMenu handleDeleteJob={handleDeleteJob} />}
    />
  );
};

export default Header;
