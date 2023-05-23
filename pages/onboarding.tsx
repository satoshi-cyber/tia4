import { withAuth } from '@/hocs';

export const runtime = 'experimental-edge';

import SetupCompany from '../screens/SetupCompany';

export default withAuth(() => <SetupCompany showSkip />);
