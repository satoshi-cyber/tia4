import { withAuth } from '@/hocs';

import MyInterviews from '../../../screens/MyInterviews';

export const runtime = 'experimental-edge';

export default withAuth(MyInterviews);
