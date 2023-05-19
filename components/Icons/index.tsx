import { HiTrash } from '@react-icons/all-files/hi/HiTrash';
import { HiCheck } from '@react-icons/all-files/hi/HiCheck';
import { HiVolumeUp } from '@react-icons/all-files/hi/HiVolumeUp';

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

const Icons = {
  HiTrash, // Preload icons for record screen
  HiCheck, // Preload icons for record screen
  HiVolumeUp, // Preload icons for record screen
  HiLinkedin,
  FaRegAngry,
  FaRegFrown,
  FaRegMeh,
  FaRegSmile,
  FaRegSmileWink,
};

export default Icons;
