
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4040/graphql",
  documents: "graphql/**/*.graphql",
  generates: {
    "gql/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"]
    }
  }
};

export default config;
