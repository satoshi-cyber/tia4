import { FORM_THEME } from "../../Form-constants";

export interface InputProps {
  name: string;
  type: string;
  variant?: keyof typeof FORM_THEME;
  before?: React.ReactElement;
  className?: string;
  after?: React.ReactElement;
  placeholder?: string;
}
