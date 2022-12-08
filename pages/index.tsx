import { URLS } from '@/config'
import { withAuth } from '@/hocs'
import { NextPageContext } from 'next'

const Home = () => {
  return null
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  if (ctx.res) {
    ctx.res.writeHead(302, {
      Location: URLS.JOBS,
    })
    ctx.res.end()
  }

  return {}
}

export default withAuth(Home)
