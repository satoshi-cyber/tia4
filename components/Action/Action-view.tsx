import Loader from '@/components/Loader'
import { useMutate } from '@/hooks'
import React from 'react'

import { ActionComponent } from './Action-types'

const Action: ActionComponent = ({ action, children }) => {
  const { isSubmitting, error, mutate } = useMutate(action)

  return (
    <>
      {React.cloneElement(children, {
        disabled: isSubmitting,
        error: error,
        onClick: mutate,
      })}
      {isSubmitting && <Loader />}
    </>
  )
}

export default Action
