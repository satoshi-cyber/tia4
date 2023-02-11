import Icons from '@/components/Icons';

import { FormIconProps } from './FormIcon-types';

export const FormIcon: React.FC<FormIconProps> = ({ name, className }) => {
  const IconComponent = Icons[name];

  return (
    <div className={className}>
      <IconComponent size={18} />
    </div>
  );
};
