module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 2019
    },
    'rules': {
        'indent': [2, 4],
        'semi': ['error', 'always'],
        'no-console': 'off',
        'no-unused-vars': 1,
        'no-trailing-spaces': ['error'],
        'eol-last': ['error', 'always'],
        'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }]
    }
};