const SocialButton = ({ title, provider, ...restProps }) => (
  <button
    {...restProps}
    className={`p-4 text-[10px] md:text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full  transition-all ease-in-out disabled:opacity-80 ${
      provider === 'linkedin' ? 'bg-[#1877F2]' : 'bg-[#2766C2]'
    }`}
  >
    {title}
  </button>
);

export default SocialButton;
