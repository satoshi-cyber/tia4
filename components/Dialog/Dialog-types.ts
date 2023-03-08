import React from "react"

export interface DialogProps {
  title: string,
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  children: React.ReactNode
  confirm?: React.ReactNode
  showCancel?: boolean
}