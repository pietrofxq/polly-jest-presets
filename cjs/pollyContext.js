"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const setup_polly_jest_1 = require("setup-polly-jest");
const core_1 = require("@pollyjs/core");
const adapter_node_http_1 = __importDefault(require("@pollyjs/adapter-node-http"));
const persister_fs_1 = __importDefault(require("@pollyjs/persister-fs"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
core_1.Polly.register(adapter_node_http_1.default);
core_1.Polly.register(persister_fs_1.default);
const mode = process.env.POLLY_MODE || 'replay';
const defaultConfig = {
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
        keepUnusedRequests: false,
        fs: {
            recordingsDir: getDefaultRecordingDir(),
        },
    },
    mode,
    recordIfMissing: false,
    recordFailedRequests: true,
    expiryStrategy: 'warn',
    expiresIn: '14d',
    matchRequestsBy: {
        headers: false,
        body: false,
    },
};
exports.pollyContext = setup_polly_jest_1.setupPolly(lodash_merge_1.default({}, defaultConfig, global.pollyConfig));
afterEach(() => exports.pollyContext.polly.flush());
function getDefaultRecordingDir() {
    const testPath = global.jasmine.testPath;
    return path_1.default.relative(process.cwd(), `${path_1.default.dirname(testPath)}/__recordings__`);
}
//# sourceMappingURL=pollyContext.js.map