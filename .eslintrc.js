module.exports = {
  env: {
    node: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2015,
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    curly: ["error", "all"],
    eqeqeq: ["error", "always"],
    "prefer-const": "error",
    "comma-dangle": ["error", "never"],
    "new-parens": "error",
    "quote-props": ["error", "as-needed"],
    "object-shorthand": "error",
    "space-before-function-paren": ["error", "never"],
    // "arrow-body-style": 0,
    "arrow-body-style": ["error", "always"],
    "arrow-parens": ["error", "always"],
    "function-paren-newline": 0,
    "prefer-destructuring": 0,
    "prefer-template": 0,
    "no-console": 0,
    "no-alert": 0,
    "no-plusplus": 0,
    "eol-last": 0,
    "no-undef": ["error", { typeof: true }],
    "no-use-before-define": 0,
    "no-else-return": ["error", { allowElseIf: true }],
    "no-empty-function": "error",
    "no-unused-expressions": ["error"],
    "no-unused-labels": "error",
    "no-var": "error",
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: false
      }
    ],
    camelcase: [
      "error",
      {
        properties: "never"
      }
    ],
    "no-unsafe-finally": "error",
    "no-cond-assign": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 2,
        maxEOF: 1
      }
    ],
    "no-caller": "error",
    "no-bitwise": "error",
    "no-debugger": "error",
    "no-eval": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    radix: ["error", "as-needed"],
    "valid-typeof": "error",
    "use-isnan": "error",
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true
      }
    ]
  }
};
