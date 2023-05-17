import { Profile } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export const parseDefaults = (
  data: Pick<
    TineInferReturn<Profile>,
    'firstName' | 'lastName' | 'linkedInProfile' | 'bio'
  >
) => ({
  firstName: data.firstName ?? undefined,
  lastName: data.lastName ?? undefined,
  linkedInProfile: data.linkedInProfile,
  bio: data.bio,
});
