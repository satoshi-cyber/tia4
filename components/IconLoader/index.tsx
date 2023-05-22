import Linkedin from '../../public/linkedin.svg';
import Smile from '../../public/icons/smile.svg';
import Angry from '../../public/icons/angry.svg';
import Frown from '../../public/icons/frown.svg';
import Meh from '../../public/icons/meh.svg';
import SmileWink from '../../public/icons/smile-wink.svg';

const HiLinkedin = ({ size = 24 }: { size?: number }) => (
  <Linkedin width={size} height={size} />
);

const FaRegSmile = ({ size = 24 }: { size?: number }) => (
  <Smile width={size} height={size} />
);

const FaRegAngry = ({ size = 24 }: { size?: number }) => (
  <Angry width={size} height={size} />
);

const FaRegFrown = ({ size = 24 }: { size?: number }) => (
  <Frown width={size} height={size} />
);

const FaRegMeh = ({ size = 24 }: { size?: number }) => (
  <Meh width={size} height={size} />
);

const FaRegSmileWink = ({ size = 24 }: { size?: number }) => (
  <SmileWink width={size} height={size} />
);

const PreloadedIcons = {
  // HiTrash, // Preload icons for record screen
  // HiCheck, // Preload icons for record screen
  // HiVolumeUp, // Preload icons for record screen
  HiLinkedin,
  FaRegAngry,
  FaRegFrown,
  FaRegMeh,
  FaRegSmile,
  FaRegSmileWink,
};

import { useEffect, useState } from 'react';
import SkeletonLoader from '../SkeletonLoader';

const IconLoader = ({
  name,
  size = 24,
  className,
  circle,
}: {
  name: string;
  size?: number;
  className?: string;
  circle?: boolean;
}) => {
  const [Icon, setIcon] = useState<any>(null);

  useEffect(() => {
    import(`@react-icons/all-files/hi/${name}.js`)
      .then((mod) =>
        setIcon(() => {
          return mod[name];
        })
      )
      .catch((e) => {
        /* silence the error */
      });
  }, [name]);

  if (PreloadedIcons[name as keyof typeof PreloadedIcons]) {
    const PreloadedIcon = PreloadedIcons[name as keyof typeof PreloadedIcons];

    return <PreloadedIcon size={size} />;
  }

  return Icon !== null ? (
    <Icon size={size} />
  ) : (
    <SkeletonLoader
      isLoading
      className={className}
      circle={circle}
      width={size}
      height={size}
    />
  );
};

export default IconLoader;
