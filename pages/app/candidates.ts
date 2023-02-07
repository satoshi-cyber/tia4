
import { withAuth } from '@/hocs'
import dynamic from 'next/dynamic';

export default withAuth(
  dynamic(() => import('../../screens/Candidates'), { ssr: false })
)

