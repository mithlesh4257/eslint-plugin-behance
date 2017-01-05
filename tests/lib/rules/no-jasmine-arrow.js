'use strict';

var rule = require('../../../lib/rules/no-jasmine-arrow');
var RuleTester = require('eslint').RuleTester;
var ruleTester = new RuleTester();
var parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
};

ruleTester.run('no-jasmine-arrow', rule, {
  valid: [
    'describe(\'foo\', function() {})',
    'it(\'foo\', function() {})',
    'beforeEach(function() {})',
    'beforeAll(function() {})',
    'afterEach(function() {})',
    'afterAll(function() {})'
  ],

  invalid: [
    {
      code: 'describe(\'foo\', () => {})',
      parserOptions,
      errors: [
        { message: 'Do not use arrow functions in describe()' }
      ]
    },
    {
      code: 'it(\'foo\', () => {})',
      parserOptions,
      errors: [
        { message: 'Do not use arrow functions in it()' }
      ]
    },
    {
      code: 'beforeEach(() => {})',
      parserOptions,
      errors: [
        { message: 'Do not use arrow functions in beforeEach()' }
      ]
    },
    {
      code: 'beforeAll(() => {})',
      parserOptions,
      errors: [
        { message: 'Do not use arrow functions in beforeAll()' }
      ]
    },
    {
      code: 'afterEach(() => {})',
      parserOptions,
      errors: [
        { message: 'Do not use arrow functions in afterEach()' }
      ]
    },
    {
      code: 'afterAll(() => {})',
      parserOptions,
      errors: [
        { message: 'Do not use arrow functions in afterAll()' }
      ]
    },
  ]
});
