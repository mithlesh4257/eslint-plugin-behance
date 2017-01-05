'use strict';

var rule = require('../../../lib/rules/no-generators');
var RuleTester = require('eslint').RuleTester;
var ruleTester = new RuleTester();
var parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
};

ruleTester.run('no-generators', rule, {
  valid: [
    'function declaration() {}',
    'expression(function() {})'
  ],

  invalid: [
    {
      code: 'function * a() {}',
      parserOptions,
      errors: [
        { message: 'Using generators (function *) is not allowed' }
      ]
    },
    {
      code: 'a(function *() {})',
      parserOptions,
      errors: [
        { message: 'Using generators (function *) is not allowed' }
      ]
    },
  ]
});
