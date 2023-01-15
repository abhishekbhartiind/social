import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typeArrays = loadFilesSync("src/schemas");
export const typeDefs = mergeTypeDefs(typeArrays);