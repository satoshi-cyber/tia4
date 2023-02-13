import React from 'react';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';

import { AnimatedDivProps } from './AnimatedDiv-types';

const AnimatedDiv: React.FC<AnimatedDivProps> = ({
  children,
  ...restProps
}) => {
  if (isMobile) return <div {...restProps}>{children}</div>;

  return <motion.div {...restProps}>{children}</motion.div>;
};

export default AnimatedDiv;
