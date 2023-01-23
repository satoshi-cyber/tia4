import Icons from "../Icons";


export interface IconProps {
  name: keyof typeof Icons;
  isLoading?: boolean
  active?: boolean
  onClick?: () => void
  className?: string
}
