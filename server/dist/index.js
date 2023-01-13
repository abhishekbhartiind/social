"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppDataSource_1 = __importDefault(require("./AppDataSource"));
const main = async () => {
    await AppDataSource_1.default.initialize();
};
main();
//# sourceMappingURL=index.js.map