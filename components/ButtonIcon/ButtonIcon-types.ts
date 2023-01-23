import Icons from "../Icons";


export interface IconProps {
  name: keyof typeof Icons;
  isLoading?: boolean
  active?: boolean
  onClick?: (e?: any) => void
  className?: string
}
