import PrivacyPolicy from '../screens/PrivacyPolicy';

export const runtime = 'experimental-edge';

export default PrivacyPolicy;

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
