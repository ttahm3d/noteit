module.exports = {
  rules: {
    "import/no-anonymous-default-export": [
      "error",
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: true,
        allowCallExpression: true, // The true value here is for backward compatibility
        allowLiteral: false,
        allowObject: false,
      },
    ],
  },
};
