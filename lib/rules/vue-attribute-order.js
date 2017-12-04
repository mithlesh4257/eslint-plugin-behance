/**
 * @fileoverview enforce alphabetical ordering of properties and prioritizing vue-specific attributes
 */

'use strict';

// Rule Definition

function getName(attribute) {
  if (!attribute.directive) {
    return attribute.key.name;
  }
  if (attribute.key.name === 'bind') {
    return attribute.key.argument || null;
  }
  if (attribute.directive) {
    return '@' + attribute.key.argument;
  }
  return null;
}

function create(context) {
  const sourceCode = context.getSourceCode();
  let attributeList;
  let previousNode;

  function reportIssue(node, previousNode) {
    const currentNode = sourceCode.getText(node.key);
    const prevNode = sourceCode.getText(previousNode.key);

    context.report({
      node: node.key,
      loc: node.loc,
      message: `Attribute ${currentNode} must go before ${prevNode}.`,
      data: {
        currentNode
      }
    });
  }

  return context.parserServices.defineTemplateBodyVisitor({
    'VStartTag'() {
      attributeList = [];
    },
    'VAttribute'(node) {
      const name = getName(node);

      if (attributeList.length && attributeList[attributeList.length - 1] < name && name) {
        attributeList.push(name);
        previousNode = node;
      }
      else if (attributeList.length === 0 && name) {
        attributeList.push(name);
        previousNode = node;
      }
      else {
        reportIssue(node, previousNode, name);
      }
    }
  });
}

module.exports = {
  meta: {
    docs: {
      description: 'enforce alphabetical ordering of properties and prioritizing vue-specific attributes',
      recommended: false
    },
    fixable: null,
    schema: []
  },
  create
};
