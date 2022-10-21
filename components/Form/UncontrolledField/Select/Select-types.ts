import React from "react";
import { FORM_THEME } from "../../Form-constants";

export interface SelectProps {
  name: string;
  variant?: keyof typeof FORM_THEME;
  before?: React.ReactElement;
  className?: string;
  after?: React.ReactElement;
  placeholder?: string;
  options: Array<{ value: string, label: string }>
}
