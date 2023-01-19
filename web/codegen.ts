
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4040/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/gql/graphql.tsx": {
      plugins: ["typescript", "typescript-react-apollo", "typescript-operations"],
      config: {
        withHooks: true,
      }
    }
  }
};

export default config;
