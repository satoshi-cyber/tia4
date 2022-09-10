import { InputField, FormIcon, Form } from "../components/Form";
import { AuthService, FormService } from "../services";

import { CenterLayout } from "../components/Layout";
import { Title } from "../components/Title";
import { Action, InjecHook } from "../lib";
import SocialButton from "../components/SocialButton";
import PrimaryButton from "../components/PrimaryButton";

const Home = () => (
  <CenterLayout>
    <Title title="Change your life Today!" />
    <Form actionKey={[AuthService.login]} className="w-full">
      <InputField
        name="email"
        type="email"
        label="Continue with email"
        placeholder="your@email.com"
        after={<FormIcon name="HiOutlineMail" size={20} />}
      />
      <InjecHook hookKey={[FormService.submitButton]}>
        <PrimaryButton title="Login / Signup" />
      </InjecHook>
    </Form>
    <p className="text-gray-600 my-5">OR</p>
    <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
      <Action hookKey={[AuthService.loginWithProvider, "facebook"]}>
        <SocialButton provider="facebook" title="Continue in with Linkedin" />
      </Action>
      <Action hookKey={[AuthService.loginWithProvider, "linkedin"]}>
        <SocialButton provider="linkedin" title="Sign in with Linkedin" />
      </Action>
    </div>
  </CenterLayout>
);

export default Home;
