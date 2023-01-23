import Layout from '@/components/Layout/Landing';
import Markdown from '@/components/Markdown';

export const TERMS_BODY = `Welcome to The Interview, a web-based platform that allows companies to create jobs and add questions for candidates to answer as part of the application process. By accessing or using our services, you agree to be bound by the following terms and conditions ("Terms").

1.  Eligibility: You must be at least 18 years old to use our services. If you are under 18, you may use our services only with the involvement of a parent or guardian.
    
2.  Account Creation: In order to use certain features of our services, you may need to create an account. You agree to provide accurate and complete information when creating your account and to keep your account information up to date.
    
3.  User Content: You are responsible for the content that you post on our platform, including but not limited to text, images, and videos. You agree not to post any content that is illegal, offensive, or that infringes on any third-party rights.
    
4.  Intellectual Property: Our platform and its content are protected by copyright, trademark, and other laws. You may not use any of our content without our express written permission.
    
5.  Disclaimer of Warranty: Our services are provided "as is" and "as available" without warranty of any kind, either express or implied. We do not guarantee that our services will be available or will function without interruption or error.
    
6.  Limitation of Liability: We will not be liable for any damages arising from the use of our services or from any information or content posted on our platform.
    
7.  Indemnification: You agree to indemnify us and our affiliates from any claims arising from your use of our services or from any content that you post on our platform.
    
8.  Termination: We reserve the right to terminate your use of our services at any time, with or without notice, for any reason or no reason.
    
9.  Changes to Terms: We reserve the right to change these Terms at any time. Your continued use of our services following any changes to these Terms will constitute your acceptance of those changes.
    
10.  Governing Law: These Terms will be governed by and construed in accordance with the laws of the country in which our company is headquartered, without giving effect to any principles of conflicts of law.
    

By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our services.`;
export const TERMS = `## Terms and conditions
${TERMS_BODY}`;

const Trems = () => (
  <Layout>
    <Markdown text={TERMS} />
  </Layout>
);

export default Trems;

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
