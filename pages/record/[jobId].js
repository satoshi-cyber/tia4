import dynamic from 'next/dynamic'

const Video = dynamic(() => import('../../screens/Record'), { ssr: false })

const RecordView = () => <Video />

export default RecordView
