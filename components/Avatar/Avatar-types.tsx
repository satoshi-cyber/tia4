import { ReactAvatarProps } from 'react-avatar';

export interface AvatarProps extends Omit<ReactAvatarProps, 'size'> {
  text?: React.ReactNode;
  isLoading?: boolean;
  size: number;
}
