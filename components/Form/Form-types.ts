import { UseFormReturn } from "react-hook-form";

export interface FormProps {
  onSubmit: (data: any) => void;
  form: UseFormReturn<any>;
  children: React.ReactNode;
  className?: string;
}
