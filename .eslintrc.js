const path = require("path");

module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "settings": {
    "import/parser": "babel-eslint",
    "import/resolver": {
      "webpack": {
        config: path.join(__dirname, '/build/webpack.dev.js')
      }
    }
  },
  rules: {
    "import/no-commonjs": ["error", "always"],
    "import/prefer-default-export": 0,

    "react/forbid-prop-types": 0,
    // "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    "react/no-deprecated": 0,
    "react/no-danger": 0,
    "react/jsx-curly-spacing": [2, {"when": "never", "allowMultiline": true}],

    "no-nested-ternary": 0,
    "function-paren-newline": 0,
    "func-names": 0,
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-console": 0,
    "prefer-template": "warn",
    "eol-last": 0,
    "quote-props": ["error", "as-needed"],
    "indent": ["error", 2, { "SwitchCase": 1, "MemberExpression": 1 }],
    "no-plusplus": 0,
    "no-mixed-operators": ["error", {"allowSamePrecedence": true}]
  }
}
