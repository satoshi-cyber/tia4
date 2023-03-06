import React from "react"

export interface DialogProps {
  title: string,
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  confirm?: React.ReactNode
}