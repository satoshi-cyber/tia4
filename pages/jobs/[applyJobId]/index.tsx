import { useSWRProps } from 'tinejs.next';
import { GetServerSideProps } from 'next';
import publicJob from '@/useCases/publicJob';
import withSWRFallback from '@/hocs/withSWRFallback';

import PublicJob from '../../../screens/PublicJob';
import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { tineCtx } from 'tinejs';

export const runtime = 'experimental-edge';

export default withSWRFallback(PublicJob);

export const getServerSideProps: GetServerSideProps<{ fallback: any }> = async (
  ctx
) => {
  const headers = new Map();

  headers.set('X-Vercel-IP-Latitude', ctx.req.headers['x-vercel-ip-latitude']);
  headers.set(
    'X-Vercel-IP-Longitude',
    ctx.req.headers['x-vercel-ip-longitude']
  );

  const jobId = String(ctx.query.applyJobId);

  const publicDataProps = ctx.req?.cookies[TOKEN_COOKIE_KEY]
    ? {}
    : await useSWRProps(
        publicJob,
        { id: jobId },
        { ctx: tineCtx({ headers }) }
      );

  return {
    props: {
      fallback: {
        ...publicDataProps,
      },
    },
  };
};
