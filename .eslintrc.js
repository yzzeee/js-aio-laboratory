module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
    globals: {
        React: true,
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                "@typescript-eslint/no-var-requires": 0
            }
        }
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["import"],
    root: true,
    rules: {
        'import/no-duplicates': 2,
        'import/no-unresolved': 2,
        'import/order': [
            2,
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc',
                },
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    ["sibling", "parent", "index"],
                    "type",
                    "unknown"
                ],
                'newlines-between': 'never',
                pathGroups: [
                    {
                        group: 'external',
                        pattern: '{react*,react*/**}',
                        position: 'before',
                    },
                ],
            },
        ],
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'sort-imports': [2, { 'ignoreDeclarationSort': true }],
    },
    settings: {
        "import/resolver": {
            node: true,
            typescript: true,
            webpack: true,
        },
    },
}