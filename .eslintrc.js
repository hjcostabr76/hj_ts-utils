module.exports = {
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    extends: [
        'hjcostabr76/ts-package',
        '.eslint-ts-naming-convention.js',
    ],
}
