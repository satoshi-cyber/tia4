import { useLogin } from './Login-hook';

import {
  CLASS_NAMES,
  EMAIL_FIELD_ICON,
  EMAIL_FIELD_PROPS,
  GOOGLE_BUTTON_PROPS,
  LINKEDIN_BUTTON_PROPS,
  SEPERATOR_TEXT,
  SUBMIT_BUTTON_PROPS,
  TITLE_PROPS,
} from './Login-constants';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import { Field, Form, FormIcon } from '@/components/Form';
import SubmitButton from '@/components/SubmitButton';
import Action from '@/components/Action';
import SocialButton from '@/components/SocialButton';

const Login = () => {
  const { form, handleSubmit, loginWithLinkedin, loginWithGoogle } = useLogin();

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
        <Action action={loginWithGoogle}>
          <SocialButton {...GOOGLE_BUTTON_PROPS} />
        </Action>
        <Action action={loginWithLinkedin}>
          <SocialButton {...LINKEDIN_BUTTON_PROPS} />
        </Action>
      </div>
    </Layout.CenterLayout>
  );
};

export default Login;
