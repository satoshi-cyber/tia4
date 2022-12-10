import React from 'react'

import { CLASS_NAMES } from './OAuthCallback-constants'
import { useOAuthCallback } from './OAuthCallback-hook'

const OAuthCallback: React.FC = () => {
  useOAuthCallback()

  return (
    <div className={CLASS_NAMES.container}>
      <div className={CLASS_NAMES.spiner} />
    </div>
  )
}

export default OAuthCallback
