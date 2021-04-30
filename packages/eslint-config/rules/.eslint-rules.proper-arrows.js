/**
 * ESLint
 * Regras do plugin 'proper-arrows' (para arrow functions).
 */
module.exports = {
    rules: {

        /* ==== Arrow Function ============================ */

        '@getify/proper-arrows/this': ['error', 'never-global', { trivial: true }],

        '@getify/proper-arrows/params': ['warn', {
            unused: 'trailing',
            count: 3,
            length: 3,
            trivial: true,
            allowed: ['i'],
        }],

        '@getify/proper-arrows/where': ['error', {  // true: barra / false: libera
            global: true,
            property: false,
            export: true,
            trivial: true,
        }],

        '@getify/proper-arrows/return': ['error', {
            object: false,
            ternary: 1,
            chained: true,      // arrow com outra arrow aninhada
            sequence: false,    // sequencias sao proibidas
            trivial: true,
        }],

        // OFF: Por preferencia
        '@getify/proper-arrows/name': 'off',    // barra funcoes anonimas
    },
};
