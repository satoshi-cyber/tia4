const PrimaryButton = ({ title, provider, ...restProps }) => (
  <button
    type="button"
    {...restProps}
    className="bg-gray-800 bg-gradient-to-r from-purple-500 w-full p-3 text-sm  text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm transition-all ease-in-out disabled:opacity-80"
  >
    {title}
  </button>
);

export default PrimaryButton;
