"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@pollyjs/core");
const chalk_1 = __importDefault(require("chalk"));
const weakMap = new WeakMap();
core_1.Polly.on('create', polly => {
    const persisted = [];
    weakMap.set(polly, persisted);
    polly.server.any().on('beforePersist', (req, recording) => {
        const { method, url } = req;
        persisted.push(`${method} ${url} ${formatStatus(recording.response.status)}`);
    });
});
core_1.Polly.on('stop', polly => {
    const persisted = weakMap.get(polly);
    if (persisted === null || persisted === void 0 ? void 0 : persisted.length) {
        console.log([
            `Polly: Added to recording ${chalk_1.default.bgGrey(polly.recordingId)}`,
            '',
            ...persisted,
        ].join('\n'));
    }
});
function formatStatus(status) {
    return status < 400 ? chalk_1.default.bgGreen(status) : chalk_1.default.bgRed(status);
}
//# sourceMappingURL=setupPersistedMessage.js.map