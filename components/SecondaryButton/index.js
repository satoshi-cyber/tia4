const SecondaryButton = ({ title, ...restProps }) => (
  <button
    {...restProps}
    type="button"
    className="border border-gray-300 sticky self-start top-0 bottom-6 w-full p-3 text-sm focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm mb-4"
  >
    {title}
  </button>
);

export default SecondaryButton;
