import clsx from "clsx"

import { CLASS_NAMES } from "./Rate-constants"

export const useRate = ({ className }: { className?: string }) => {
  const classNames = {
    ...CLASS_NAMES,
    constainer: clsx(CLASS_NAMES.container, className)
  }

  return {
    classNames
  }
}