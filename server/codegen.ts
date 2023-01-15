
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schemas/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      config: {
        useIndexSignature: true,
        mappers: {
          "User": "src/entities/user#UserEntity",
          "Post": "src/entities/post#PostEntity"
        }
      },
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
