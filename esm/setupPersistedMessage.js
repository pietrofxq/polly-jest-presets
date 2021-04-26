import { Polly } from '@pollyjs/core';
import chalk from 'chalk';
const weakMap = new WeakMap();
Polly.on('create', polly => {
    const persisted = [];
    weakMap.set(polly, persisted);
    polly.server.any().on('beforePersist', (req, recording) => {
        const { method, url } = req;
        persisted.push(`${method} ${url} ${formatStatus(recording.response.status)}`);
    });
});
Polly.on('stop', polly => {
    const persisted = weakMap.get(polly);
    if (persisted === null || persisted === void 0 ? void 0 : persisted.length) {
        console.log([
            `Polly: Added to recording ${chalk.bgGrey(polly.recordingId)}`,
            '',
            ...persisted,
        ].join('\n'));
    }
});
function formatStatus(status) {
    return status < 400 ? chalk.bgGreen(status) : chalk.bgRed(status);
}
//# sourceMappingURL=setupPersistedMessage.js.map