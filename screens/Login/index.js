import {
  Form,
  InputField,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  SocialButton,
} from "../../components";
import { Action, InjecHook } from "../../lib";
import { AuthService, FormService } from "../../services";

const Login = () => (
  <Layout.CenterLayout>
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
  </Layout.CenterLayout>
);

export default Login;
