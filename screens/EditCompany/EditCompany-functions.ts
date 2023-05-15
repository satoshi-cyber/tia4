import { MyCompany } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export const formatDefaultValues = ({
  name,
  description,
  website,
}: TineInferReturn<MyCompany>) => ({ name, description, website });
