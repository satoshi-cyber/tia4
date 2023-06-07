import { Profile } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export const parseDefaults = (data: TineInferReturn<Profile>) => ({
  firstName: data?.firstName ?? undefined,
  lastName: data?.lastName ?? undefined,
  linkedInProfile: data?.linkedInProfile,
  bio: data?.bio,
});
