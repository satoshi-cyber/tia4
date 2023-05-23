import TermsAndConditions from '../screens/TermsAndConditions';

export const runtime = 'experimental-edge';

export default TermsAndConditions;

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
