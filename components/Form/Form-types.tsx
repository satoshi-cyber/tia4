import { UseFormReturn } from "react-hook-form";

export interface FormProps {
  onSubmit: () => {};
  form: UseFormReturn;
  children: React.ReactNode;
}
