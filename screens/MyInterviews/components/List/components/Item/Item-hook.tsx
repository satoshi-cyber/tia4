import { URLS } from '@/config';
import S3UrlProvider from '@/context/S3UrlProvider';
import { useTimeAgo } from '@/hooks';
import { useContext } from 'react';

export const useItem = ({
  date,
  id,
  thumbnail,
}: {
  id: string;
  date?: Date;
  thumbnail?: string;
}) => {
  const { getUrl } = useContext(S3UrlProvider.Context);

  const timeAgo = useTimeAgo(date);

  const href = URLS.MY_INTERVIEW.replace('[interviewId]', String(id));

  const src = thumbnail && getUrl(thumbnail);

  return { timeAgo, href, src };
};
