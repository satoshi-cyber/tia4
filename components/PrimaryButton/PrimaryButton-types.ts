import React from "react";

export interface PrimaryButtonProps {
  title: string;
  className?: string
  onClick?: () => void
  before?: React.ReactNode
}
