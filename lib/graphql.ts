import { cacheExchange, createClient, dedupExchange, fetchExchange, makeOperation } from 'urql'
import { authExchange } from '@urql/exchange-auth';
import { TOKEN_COOKIE_KEY } from '@/config/auth'
import { URLS } from '@/config';
import { AuthenticateUserDocument, AuthenticateUserMutation, AuthenticateUserMutationVariables } from '@/graphql';
import { Magic } from 'magic-sdk';
import { Cookies } from 'react-cookie';

const url = 'https://tia4-backend.vercel.app/graphql'

const magic =
  typeof window !== 'undefined' ?
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!) : undefined

export const client = createClient({
  url,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange<{ token: string }>({
      async getAuth({ authState, mutate }) {
        const cookies = new Cookies();

        if (!authState) {
          const token = cookies.get(TOKEN_COOKIE_KEY)

          if (token) {
            return { token };
          }

          return null;
        }

        try {
          const did = await magic?.user.getIdToken()

          if (!did) {
            throw new Error("No DID")
          }

          const result = await mutate<AuthenticateUserMutation, AuthenticateUserMutationVariables>(AuthenticateUserDocument, {
            input: { did }
          });

          if (result.data?.authenticateUser.token) {
            cookies.set(TOKEN_COOKIE_KEY, result.data?.authenticateUser.token)

            return { token: result.data?.authenticateUser.token }
          }

          throw new Error("No token")

        } catch (e) {

          cookies.remove(TOKEN_COOKIE_KEY)
          window.location.replace(URLS.LOGIN);

          return null

        }
      },
      addAuthToOperation({ authState, operation }) {
        console.log({ authState })

        if (!authState || !authState.token) {
          return operation;
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.token}`,
            },
          },
        });
      },

      didAuthError({ error }) {
        return error.graphQLErrors.some(
          e => e.extensions?.code === 'UNAUTHENTICATED'
        );
      },

      willAuthError({ authState }) {
        if (!authState) {
          return true
        }
        return false
      },
    }),
    fetchExchange,
  ],
})
