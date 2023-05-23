import { withAuth } from '@/hocs';

import JoinCompany from '../../screens/JoinCompany';

export const runtime = 'experimental-edge';

export default withAuth(JoinCompany);
