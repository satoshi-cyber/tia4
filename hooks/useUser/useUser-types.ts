export type User = {
  id: string
  smeId: string
  name: string
  email: string
  profileImage: string
}

export type ParsedToken = {
  userData: User
  iat: number
  exp: number
}
