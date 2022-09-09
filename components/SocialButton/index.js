import { Action } from "../../lib";
import { AuthService } from "../../services";

const SocialButton = ({ title, provider, ...restProps }) => (
  <Action hookKey={[AuthService.loginWithProvider, provider]}>
    <button
      {...restProps}
      className={`p-4 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full  transition-all ease-in-out disabled:opacity-80 ${
        provider === "linkedin" ? "bg-[#1877F2]" : "bg-[#2766C2]"
      }`}
    >
      {title}
    </button>
  </Action>
);

export default SocialButton;
