export const FORM_THEME = {
  default: {
    width: "w-full",
    container:
      "transition-all group mb-4 border border-gray-300 flex items-stretch rounded-md overflow-hidden group-data-[error=true]/wrapper:border-red-600 focus-within:border-purple-800 focus-within:shadow-hover",
    containerWidth: "w-full",
    style: "border-none focus:ring-0 flex-1 bg-white",
    padding: "px-3 py-2",
    appendContainer: "flex items-center",
    appendRight: "pr-3 border-l h-full flex items-center pl-3 group-focus-within:text-purple-800",
    appendLeft: "pl-3",
  },
  clean: {
    container: "flex items-stretch rounded-md overflow-hidden",
    containerWidth: "w-full",
    style: "border-none focus:ring-0 flex-1",
    padding: "px-0 py-2",
    appendContainer: "flex items-center",
    appendRight: "pr-3 border-l h-full flex items-center pl-3",
    appendLeft: "mr-2",
  },
};
