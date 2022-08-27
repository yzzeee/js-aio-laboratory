module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
    globals: {
        React: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: "module",
    },
    root: true,
    rules: {
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
    },
}