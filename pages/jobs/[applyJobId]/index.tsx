import { useSWRProps } from 'tinejs.next';
import { GetServerSideProps } from 'next';
import publicJob from '@/useCases/publicJob';

import PublicJob from '../../../screens/PublicJob';
import { SWRConfig } from 'swr';

export const runtime = 'experimental-edge';

export default (props: any) => {
  return (
    <SWRConfig
      value={{ ...props, revalidateOnMount: false, revalidateOnFocus: false }}
    >
      <PublicJob />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps<{ fallback: any }> = async (
  ctx
) => {
  const jobId = String(ctx.query.applyJobId);

  const publicDataProps = await useSWRProps(publicJob, { id: jobId });

  return {
    props: {
      fallback: {
        ...publicDataProps,
      },
    },
  };
};
