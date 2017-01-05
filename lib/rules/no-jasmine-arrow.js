/**
 * @fileoverview Rule that disallows passing arrow functions as arguments to Jasmine test functions
 */

'use strict';

module.exports = {
  meta: {
    schema: []
  },

  create(context) {
    function report(node, callee) {
      context.report({
        node,
        message: 'Do not use arrow functions in {{callee}}()',
        data: {
          callee
        }
      });
    }

    return {

      CallExpression(node) {
        const testFunctions = ['describe', 'it', 'beforeEach', 'beforeAll', 'afterEach', 'afterAll'];

        if (testFunctions.indexOf(node.callee.name) > -1 &&
            node.arguments.some(arg => arg.type === 'ArrowFunctionExpression')
        ) {
          report(node, node.callee.name);
        }
      }
    };
  }
};
