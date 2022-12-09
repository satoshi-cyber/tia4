import { useLogin } from './Login-hook'

import {
  Form,
  Field,
  Layout,
  Title,
  FormIcon,
  SocialButton,
  SubmitButton,
} from '../../components'

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
        <SubmitButton title="Login / Signup" />
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
