import Google from '../../public/google.svg';
import Linkedin from '../../public/linkedin.svg';

const CLASS_NAMES = {
  linkedin: 'bg-[#1877F2] text-gray-100 hover:shadow-button',
  facebook: 'bg-[#2766C2] text-gray-100 hover:shadow-button',
  google: 'bg-[#ffffff] text-gray-800 border border-gray-200 hover:shadow-icon',
};

const ICON = {
  google: <Google width={20} />,
  linkedin: <Linkedin width={20} />,
};

const SocialButton = ({ title, provider, ...restProps }) => (
  <button
    {...restProps}
    className={`p-3 h-11 text-xs focus:outline-none rounded-full transition-all disabled:opacity-80 ${CLASS_NAMES[provider]} flex items-center`}
  >
    {ICON[provider]}
    <span className="flex flex-1 text-center justify-center">{title}</span>
  </button>
);

export default SocialButton;
