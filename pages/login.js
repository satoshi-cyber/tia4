import { InputField, FormIcon, Form } from "../components/Form";
import { AuthService, FormService } from "../services";

import { CenterLayout } from "../components/Layout";
import { Title } from "../components/Title";
import { Action, InjectProps } from "../lib";
import SocialButton from "../components/SocialButton";
import PrimaryButton from "../components/PrimaryButton";

export default function Home() {
  return (
    <CenterLayout>
      <Title title="Change your life Today!" />
      <Form hookKey={[AuthService.login]} className="w-full">
        <InjectProps hookKey={[FormService.Register, "email"]}>
          <InputField
            type="email"
            label="Continue with email"
            placeholder="your@email.com"
            after={<FormIcon name="HiOutlineMail" size={20} />}
          />
        </InjectProps>
        <InjectProps hookKey={[FormService.SubmitButton]}>
          <PrimaryButton title="Login / Signup" />
        </InjectProps>
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
}
