export interface IconProps {
  name: string;
  isLoading?: boolean;
  active?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
  size?: number;
  circle?: boolean;
  variant?: 'default' | 'clean';
}
