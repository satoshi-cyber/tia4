import { createClient } from 'urql'

const url = 'https://tia4-backend.vercel.app/graphql'

export const client =  createClient({ url })