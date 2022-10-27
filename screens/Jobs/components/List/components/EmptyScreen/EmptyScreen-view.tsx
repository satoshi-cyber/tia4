import React from 'react'

import { CLASS_NAMES, TITLE, SUB_TITLE } from './EmptyScreen-constants'

const EmptyScreen: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <p className={CLASS_NAMES.title}>{TITLE}</p>
    <p className={CLASS_NAMES.subTitle}>{SUB_TITLE}</p>
  </div>
)

export default EmptyScreen
