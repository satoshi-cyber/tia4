export const COOKIE_EXPIRE = 2592000 * 1000

export const getCookieOptions = () => ({
  path: '/',
  expires: new Date(Date.now() + COOKIE_EXPIRE),
})
