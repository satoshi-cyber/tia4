import * as Icons from 'react-icons/hi'

export interface IconProps {
  name: keyof typeof Icons;
  isLoading?: boolean
  size?: number
  onClick?: () => void
  className?: string
}
