import { tineAction } from 'tinejs';

import { EmailTemplateProps, MailServiceResponse } from './types';

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
  }) =>
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
      .then((response) => response.json())
      .then((data) => data as MailServiceResponse),
  { action: 'sendMail' }
);

export default sendMail;
