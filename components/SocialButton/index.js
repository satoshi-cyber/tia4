const SocialButton = ({ title, provider, ...restProps }) => (
  <button
    {...restProps}
    className={`p-3 h-11 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full  transition-all ease-in-out disabled:opacity-80 transition-all ${
      provider === 'linkedin' ? 'bg-[#1877F2]' : 'bg-[#2766C2]'
    }`}
  >
    {title}
  </button>
);

export default SocialButton;
