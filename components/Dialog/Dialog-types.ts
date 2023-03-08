import React from "react"

export interface DialogProps {
  title: string,
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  onConfirm?: () => void
  confirm?: React.ReactNode
  showCancel?: boolean
}