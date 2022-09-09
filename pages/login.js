import { InputField, FormIcon, Form } from "../components/Form";
import { AuthService } from "../services";

import SocialButton from "../components/SocialButton";
import { CenterLayout } from "../components/Layout";
import { Title } from "../components/Title";
import SubmitButton from "../components/SubmitButton";

export default function Home() {
  return (
    <CenterLayout hideMenu tight>
      <Title title="Change your life Today!" />
      <Form hookKey={[AuthService.login]} className="w-full">
        <InputField
          label="Continue with email"
          type="email"
          placeholder="your@email.com"
          after={<FormIcon name="HiOutlineMail" size={20} />}
        />
        <SubmitButton title="Login / Signup" />
      </Form>
      <p className="text-gray-600 my-5">OR</p>
      <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
        <SocialButton provider="facebook" title="Continue in with Linkedin" />
        <SocialButton provider="linkedin" title="Sign in with Linkedin" />
      </div>
    </CenterLayout>
  );
}
