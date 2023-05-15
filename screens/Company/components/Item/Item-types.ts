import { CompanyMembers } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export interface ItemProps {
  member: TineInferReturn<CompanyMembers>[0];
}
