import { withAuth } from '@/hocs';

import CreateEditAJob from '../../screens/CreateEditAJob';

export const runtime = 'experimental-edge';

export default withAuth(CreateEditAJob);
