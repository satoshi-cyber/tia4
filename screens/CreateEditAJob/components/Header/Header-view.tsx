import { Title } from '@/components';
import SettingsMenu from '@/components/SettingsMenu';

import { useHeader } from './Header-hook';
import { HeaderProps } from './Header-types';

export const Header: React.FC<HeaderProps> = ({ editJob, handleDeleteJob }) => {
  const { title, titleProps, items } = useHeader({ editJob, handleDeleteJob });

  return (
    <Title
      title={title}
      {...titleProps}
      after={editJob && <SettingsMenu items={items} />}
    />
  );
};

export default Header;
