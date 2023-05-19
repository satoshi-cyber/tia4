import { tineAction } from 'tinejs';

import { EmailTemplateProps } from './types';

import { env } from '../config';

const sendMail = tineAction(
  <T extends keyof EmailTemplateProps>({
    template,
    to,
    props,
  }: {
    template: T;
    props: EmailTemplateProps[T];
    to: string;
  }) => {
    // don't wait for email
    fetch(env.MAIL_SERVICE_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Entity-Ref-ID': 'null',
        'X-API-KEY': env.MAIL_API_KEY,
      },
      body: JSON.stringify({
        to,
        templateName: template,
        props,
        headers: {
          'X-Entity-Ref-ID': 'null',
        },
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);

    return true;
  },
  { action: 'sendMail' }
);

export default sendMail;
