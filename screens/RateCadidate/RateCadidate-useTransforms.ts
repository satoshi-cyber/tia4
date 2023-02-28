import { useScroll, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

export const useTransforms = () => {
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 1280px)',
  });

  const { scrollY } = useScroll();

  const marginLeft = useTransform(
    scrollY,
    [0, 700],
    [0, isLargeScreen ? 650 : 0]
  );
  const marginRight = useTransform(
    scrollY,
    [0, 700],
    [0, isLargeScreen ? -650 : 0]
  );
  const scale = useTransform(scrollY, [0, 700], [1, isLargeScreen ? 0.7 : 1]);
  const docScale = useTransform(
    scrollY,
    [0, 700],
    [isLargeScreen ? 0.78 : 1, 1]
  );
  const containerMarginRight = useTransform(
    scrollY,
    [0, isLargeScreen ? 700 : 0],
    [0, isLargeScreen ? -450 : 0]
  );
  const containerMarginTop = useTransform(scrollY, [0, 700], [0, 200]);
  const opacity = useTransform(scrollY, [0, 100], [1, isLargeScreen ? 0 : 1]);

  return { scale, docScale, marginLeft, marginRight, containerMarginTop, containerMarginRight, opacity }
};
