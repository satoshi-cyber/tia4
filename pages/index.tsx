import { URLS } from '@/config'
import { withAuth } from '@/hocs'
import { useUser } from '@/hooks'
import Router from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  const { hasCompany } = useUser()

  useEffect(() => {
    if (hasCompany) {
      Router.replace(URLS.JOBS)

      return
    }

    Router.replace(URLS.MY_VIDEOS)
  }, [])

  return null
}

export default withAuth(Home)
