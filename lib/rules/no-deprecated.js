/**
 * @fileoverview Rule that warns when blacklisted import statements or
 * member expressions are used.
 */

'use strict';

// Rule Definition

module.exports = {
  meta: {
    schema: [{
      type: 'object',
      properties: {
        imports: {
          additionalProperties: { type: 'string' },
          uniqueItems: true
        },
        expressions: {
          additionalProperties: { type: 'string' },
          uniqueItems: true
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    var blacklist = context.options[0] || {};
    var imports = blacklist.imports;
    var expressions = blacklist.expressions;

    function report(node, item, suggestion) {
      context.report({
        node,
        message: '{{item}} is deprecated. Use {{suggestion}} instead',
        data: {
          item,
          suggestion
        }
      });
    }

    return {
      ImportDeclaration(node) {
        if (imports) {
          if (node.source && node.source.value) {
            var path = node.source.value.trim();

            if (imports.hasOwnProperty(path)) {
              report(node, path, imports[path]);
            }
          }
        }
      },

      MemberExpression(node) {
        if (expressions) {
          var expr = node.object.name + '.' + node.property.name;

          if (expressions.hasOwnProperty(expr)) {
            report(node, expr, expressions[expr]);
          }
        }
      }
    };
  }
};
