import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ActiveLinkProps } from './ActiveLink-types'

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, ...props }) => {
  const { asPath } = useRouter()

  return (
    <Link {...props} legacyBehavior>
      {React.cloneElement(children, {
        'data-active': asPath.includes(props.href.toString()),
      })}
    </Link>
  )
}

export default ActiveLink
