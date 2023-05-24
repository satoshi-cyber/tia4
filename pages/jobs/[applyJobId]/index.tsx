import { useSWRProps } from 'tinejs.next';
import { GetServerSideProps } from 'next';
import publicJob from '@/useCases/publicJob';
import withSWRFallback from '@/hocs/withSWRFallback';

import PublicJob from '../../../screens/PublicJob';
import { TOKEN_COOKIE_KEY } from '@/config/auth';

export const runtime = 'experimental-edge';

export default withSWRFallback(PublicJob);

export const getServerSideProps: GetServerSideProps<{ fallback: any }> = async (
  ctx
) => {
  const jobId = String(ctx.query.applyJobId);

  const publicDataProps = ctx.req?.cookies[TOKEN_COOKIE_KEY]
    ? {}
    : await useSWRProps(publicJob, { id: jobId });

  return {
    props: {
      fallback: {
        ...publicDataProps,
      },
    },
  };
};
