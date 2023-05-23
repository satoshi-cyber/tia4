import { withAuth } from '@/hocs';

import Profile from '../../screens/Profile';

export const runtime = 'experimental-edge';

export default withAuth(Profile);
