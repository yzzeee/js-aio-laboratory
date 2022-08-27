module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: "module",
    },
    root: true,
}