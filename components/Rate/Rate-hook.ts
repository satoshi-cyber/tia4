import clsx from "clsx"
import { useState } from "react"

import { CLASS_NAMES } from "./Rate-constants"

export const useRate = ({ className }: { className?: string }) => {
  const [score, setScore] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const classNames = {
    ...CLASS_NAMES,
    constainer: clsx(CLASS_NAMES.container, className)
  }

  const handleRate = (index: number) => {
    setScore(index)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return {
    score,
    classNames,
    isDialogOpen,
    closeDialog,
    handleRate
  }
}