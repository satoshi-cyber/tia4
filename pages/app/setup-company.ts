import { withAuth } from '@/hocs';

import SetupCompany from '../../screens/SetupCompany';

export const runtime = 'experimental-edge';

export default withAuth(SetupCompany);
