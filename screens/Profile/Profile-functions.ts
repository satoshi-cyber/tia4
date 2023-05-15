import { Profile } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export const pickValues = ({
  firstName,
  lastName,
  linkedInProfile,
  bio,
}: Pick<
  TineInferReturn<Profile>,
  'firstName' | 'lastName' | 'linkedInProfile' | 'bio'
>) => ({
  firstName: firstName ?? undefined,
  lastName: lastName ?? undefined,
  linkedInProfile,
  bio: bio,
});
