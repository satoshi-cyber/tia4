import React from 'react'

import { CLASS_NAMES } from './Spinner-constants'

const OAuthCallback: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <div className={CLASS_NAMES.spiner} />
  </div>
)

export default OAuthCallback
