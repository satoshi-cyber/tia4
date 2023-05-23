import Landing from '../screens/Landing';

export default Landing;

export const runtime = 'experimental-edge';

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
