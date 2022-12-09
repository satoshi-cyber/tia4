import { ReactAvatarProps } from 'react-avatar'

export interface AvatarProps extends ReactAvatarProps {
  text?: React.ReactNode
  isLoading?: boolean
}
