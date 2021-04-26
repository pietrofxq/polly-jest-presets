import path from 'path';
import { setupPolly } from 'setup-polly-jest';
import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import merge from 'lodash.merge';
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);
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
export const pollyContext = setupPolly(merge({}, defaultConfig, global.pollyConfig));
afterEach(() => pollyContext.polly.flush());
function getDefaultRecordingDir() {
    const testPath = global.jasmine.testPath;
    return path.relative(process.cwd(), `${path.dirname(testPath)}/__recordings__`);
}
//# sourceMappingURL=pollyContext.js.map