
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://tia4-backend.vercel.app/graphql",
  documents: "graphql/**/*.graphql",
  generates: {
    "graphql/index.ts": {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-urql'],
      config: {
        withHooks: true
      }
    }
  }
};

export default config;
