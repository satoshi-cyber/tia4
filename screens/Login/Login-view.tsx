import {
  Form,
  Field,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  SocialButton,
} from '../../components'
import { InjecHook } from '../../lib'
import { FormService } from '../../services'
import { useLogin } from './Login-hook'

const Login = () => {
  const { form, handleSubmit } = useLogin()

  return (
    <Layout.CenterLayout>
      <Title title="Change your life Today!" />
      <Form form={form} onSubmit={handleSubmit} className="w-full">
        <Field.Input
          name="email"
          type="email"
          label="Continue with email"
          placeholder="your@email.com"
          after={<FormIcon name="HiOutlineMail" />}
        />
        <InjecHook hookKey={[FormService.submitButton]}>
          <PrimaryButton title="Login / Signup" />
        </InjecHook>
      </Form>
      <p className="text-gray-600 my-5">OR</p>
      <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
        <SocialButton provider="facebook" title="Continue in with facebook" />
        <SocialButton provider="linkedin" title="Sign in with Linkedin" />
      </div>
    </Layout.CenterLayout>
  )
}

export default Login
