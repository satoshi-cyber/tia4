import dynamic from 'next/dynamic'

export default dynamic(() => import('../../../screens/Record'), { ssr: false })
