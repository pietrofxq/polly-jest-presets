declare type PollyContext = {
    polly: import('@pollyjs/core').Polly & {
        config: import('@pollyjs/core').PollyConfig;
    };
};
export declare const pollyContext: PollyContext;
export {};
