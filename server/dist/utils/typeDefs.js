"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const typeArrays = (0, load_files_1.loadFilesSync)("src/schemas");
exports.typeDefs = (0, merge_1.mergeTypeDefs)(typeArrays);
//# sourceMappingURL=typeDefs.js.map