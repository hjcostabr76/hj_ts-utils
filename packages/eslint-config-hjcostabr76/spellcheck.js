module.exports = {
    plugins: ['spellcheck'],
    rules: {
        'spellcheck/spell-checker': ['warn', {
            comments: false,
            strings: false,
            templates: false,
            identifiers: true,
            lang: 'en_US',
            minLength: 4,
            skipWords: [
                'enum',
                'redux',
                'utils',
                'debounce',
                'persistor',
                'param',
                'params',
                'http',
                'auth',
                'sider',
                'validator',
                'verifier',
                'cnpj',
                'args',
                'firebase',
                'async',
                'axios',
                'cascader',
                'modalities',
                'tooltip',
                'middleware',
                'morgan',
                'preflight',
                'cors',
                'getter',
                'inversed',
                'html',
                'whitelist',
                'schemas',
                'unprocessable',
                'initializer',
                'metadata',
                'nullish',
                'charset',
                'orphanhood',
                'nullable',
            ]}
        ],
    },
}
