import { useLogin } from './Login-hook'

import {
  CLASS_NAMES,
  EMAIL_FIELD_ICON,
  EMAIL_FIELD_PROPS,
  FACEBOOK_BUTTON_PROPS,
  LINKEDIN_BUTTON_PROPS,
  SEPERATOR_TEXT,
  SUBMIT_BUTTON_PROPS,
  TITLE_PROPS,
} from './Login-constants'

import {
  Form,
  Field,
  Layout,
  Title,
  FormIcon,
  SocialButton,
  SubmitButton,
  Action,
} from '../../components'

const Login = () => {
  const { form, handleSubmit, loginWithFacebook, loginWithLinkedin } =
    useLogin()

  return (
    <Layout.CenterLayout>
      <Title title={TITLE_PROPS.title} />
      <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
        <Field.Input
          {...EMAIL_FIELD_PROPS}
          after={<FormIcon name={EMAIL_FIELD_ICON} />}
        />
        <SubmitButton {...SUBMIT_BUTTON_PROPS} />
      </Form>
      <p className={CLASS_NAMES.seperator}>{SEPERATOR_TEXT}</p>
      <div className={CLASS_NAMES.socialButtonsContainer}>
        <Action action={loginWithFacebook}>
          <SocialButton {...FACEBOOK_BUTTON_PROPS} />
        </Action>
        <Action action={loginWithLinkedin}>
          <SocialButton {...LINKEDIN_BUTTON_PROPS} />
        </Action>
      </div>
    </Layout.CenterLayout>
  )
}

export default Login
