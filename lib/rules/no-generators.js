/**
 * @fileoverview Rule that disallows using generators (function *)
 */

'use strict';

module.exports = {
  meta: {
    schema: []
  },

  create(context) {
    function report(node) {
      context.report({
        node,
        message: 'Using generators (function *) is not allowed'
      });
    }

    return {
      FunctionDeclaration(node) {
        if (node.generator) {
          report(node);
        }
      },
      FunctionExpression(node) {
        if (node.generator) {
          report(node);
        }
      }
    };
  }
};
