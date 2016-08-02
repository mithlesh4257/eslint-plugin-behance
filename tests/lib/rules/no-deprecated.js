'use strict';

var rule = require('../../../lib/rules/no-deprecated');
var RuleTester = require('eslint').RuleTester;
var ruleTester = new RuleTester();
var parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
};

ruleTester.run('no-deprecated', rule, {
  valid: [
    {
      code: 'import $ from \'jquery\'',
      parserOptions,
      options: [{
        imports: {
          'nbd/util/extend': 'Object.assign',
          'nbd/Promise': 'Promise'
        }
      }]
    },
    {
      code: '$.isArray(data)',
      parserOptions,
      options: [{
        expressions: {
          '$.extend': 'Object.assign',
          '$.ajax': 'fetch'
        }
      }]
    }
  ],

  invalid: [
    {
      code: 'import extend from \'nbd/util/extend\'',
      parserOptions,
      options: [{ imports: { 'nbd/util/extend': 'Object.assign' } }],
      errors: [
        { message: 'nbd/util/extend is deprecated. Use Object.assign instead' }
      ]
    },
    {
      code: 'import Promise from \'nbd/Promise\'',
      parserOptions,
      options: [{ imports: { 'nbd/Promise': 'Promise' } }],
      errors: [
        { message: 'nbd/Promise is deprecated. Use Promise instead' }
      ]
    },
    {
      code: '$.extend(true, {}, fixtures)',
      parserOptions,
      options: [{ expressions: { '$.extend': 'Object.assign' } }],
      errors: [
        { message: '$.extend is deprecated. Use Object.assign instead' }
      ]
    },
    {
      code: '$.ajax()',
      parserOptions,
      options: [{ expressions: { '$.ajax': 'fetch' } }],
      errors: [
        { message: '$.ajax is deprecated. Use fetch instead' }
      ]
    }
  ]
});
