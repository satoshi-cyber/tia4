import Layout from '@/components/Layout/Landing';
import Markdown from '@/components/Markdown';

const POLICY = `## Privacy Policy
At The Interview, we understand the importance of protecting your personal information and are committed to maintaining the privacy and security of your data. This Privacy Policy explains how we collect, use, and share your personal information.

Collection of Information

*   We collect information that you voluntarily provide to us, such as your name, contact information, and employment history.
*   We also collect information about your use of our platform, such as the pages you visit and the actions you take.

Use of Information

*   We use the information we collect to provide and improve our platform, to communicate with you, and to comply with legal obligations.
*   We may also use your information to send you marketing and promotional materials, but only if you have given us permission to do so.

Sharing of Information

*   We may share your information with our service providers and partners who perform services on our behalf.
*   We may also share your information as required by law, such as in response to a subpoena or court order.
*   We will not sell or rent your personal information to third parties.

Data Security

*   We take the security of your personal information seriously and have implemented appropriate measures to protect it from unauthorized access, use, or disclosure.
*   However, please note that no method of data transmission over the internet is 100% secure, so we cannot guarantee the security of your information.

Data Retention

*   We retain your personal information for as long as necessary to provide our services or as required by law.

Changes to This Policy

*   We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy, and in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).

Contact Us

*   If you have any questions about this Privacy Policy or our treatment of your personal information, please contact us by email at dataprotection@theinterview.io.

Your Choices

*   You can always choose not to provide us with your personal information, however, this may limit your use of some features of our platform.
*   You may also opt out of receiving marketing and promotional materials from us by following the unsubscribe instructions included in those emails or by contacting us directly.

Data Subject Rights

*   Depending on your jurisdiction you may have certain rights related to your personal information, such as the right to access, correct, or delete your personal information. If you would like to exercise any of these rights, please contact us.

Children's Privacy

*   Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe that your child under 13 has provided us with personal information, please contact us.

By using our platform, you consent to our collection, use, and sharing of your personal information as described in this Privacy Policy.

This Privacy Policy is subject to change, so please check back periodically for updates.
  `;

const Policy = () => (
  <Layout>
    <Markdown text={POLICY} />
  </Layout>
);

export default Policy;
