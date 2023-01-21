import Icons from "../Icons";

export interface IconProps {
  name: keyof typeof Icons;
  isLoading?: boolean
  size?: number
  onClick?: () => void
  className?: string
}
