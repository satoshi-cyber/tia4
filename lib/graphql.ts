import {
  cacheExchange,
  CombinedError,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
} from 'urql';
import { retryExchange } from '@urql/exchange-retry';
import { authExchange } from '@urql/exchange-auth';
import { requestPolicyExchange } from '@urql/exchange-request-policy';
import { TOKEN_COOKIE_KEY } from '@/config/auth';
import { GRAPHQL_URL, URLS } from '@/config';
import {
  AuthenticateUserDocument,
  AuthenticateUserMutation,
  AuthenticateUserMutationVariables,
} from '@/graphql';
import { Magic } from 'magic-sdk';
import { Cookies } from 'react-cookie';

import { getCookieOptions } from './cookie';

const ttl = 30 * 60 * 1000;

const magic =
  typeof window !== 'undefined'
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!)
    : undefined;

const retryOptions = {
  initialDelayMs: 1000,
  maxDelayMs: 15000,
  randomDelay: true,
  maxNumberAttempts: 10,
  retryIf: (err: CombinedError) => Boolean(err.networkError),
};

export const client = createClient({
  url: GRAPHQL_URL,
  exchanges: [
    dedupExchange,
    requestPolicyExchange({
      ttl,
    }),
    cacheExchange,
    retryExchange(retryOptions),
    authExchange<{ token: string }>({
      async getAuth({ authState, mutate }) {
        const cookies = new Cookies();

        if (!authState) {
          const token = cookies.get(TOKEN_COOKIE_KEY);

          if (token) {
            return { token };
          }

          return null;
        }

        try {
          const did = await magic?.user.getIdToken();

          if (!did) {
            throw new Error('No DID');
          }

          const result = await mutate<
            AuthenticateUserMutation,
            AuthenticateUserMutationVariables
          >(AuthenticateUserDocument, {
            input: { did },
          });

          if (result.data?.authenticateUser.token) {
            cookies.set(
              TOKEN_COOKIE_KEY,
              result.data?.authenticateUser.token,
              getCookieOptions()
            );

            return { token: result.data?.authenticateUser.token };
          }

          throw new Error('No token');
        } catch (e) {
          cookies.remove(TOKEN_COOKIE_KEY);
          window.location.replace(URLS.LOGIN);

          return null;
        }
      },
      addAuthToOperation({ authState, operation }) {
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
          (e) => e.extensions?.code === 'UNAUTHENTICATED'
        );
      },

      willAuthError({ authState }) {
        if (!authState) {
          return true;
        }
        return false;
      },
    }),
    fetchExchange,
  ],
});
