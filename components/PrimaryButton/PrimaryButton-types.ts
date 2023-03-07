import React from "react";

export interface PrimaryButtonProps {
  title: React.ReactNode;
  className?: string
  onClick?: () => void
  before?: React.ReactNode
  isLoading?: boolean,
  disabled?: boolean
}
