import { FORM_THEME } from '../../Form-constants';

export interface InputProps {
  variant: keyof typeof FORM_THEME
  before: React.ReactElement,
  className: string,
  after: React.ReactElement,
  name: string
}
