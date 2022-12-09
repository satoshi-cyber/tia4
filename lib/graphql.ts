import { TOKEN_COOKIE_KEY } from '@/config/auth'
import { createClient } from 'urql'

const url = 'https://tia4-backend.vercel.app/graphql'

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return

  name = name + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookies = decodedCookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
}

export const client = createClient({
  url,
  fetchOptions: () => {
    const token = getCookie(TOKEN_COOKIE_KEY)

    return {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    }
  },
})
