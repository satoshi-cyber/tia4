import { withAuth } from '@/hocs';

import MyInterview from '../../../screens/MyInterview';

export const runtime = 'experimental-edge';

export default withAuth(MyInterview);
