'use strict';

var rule = require('../../../lib/rules/vue-attribute-order');
var RuleTester = require('eslint').RuleTester;
var tester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
  parser: 'vue-eslint-parser'
});

tester.run('vue-attribute-order', rule, {
  valid: [
    {
      code: '<template><div></div></template>'
    },
    {
      code: '<template><div><custom aria-test="bar" data-id="foo" myProp="prop"></custom></div></template>'
    },
    {
      code: '<template><div><custom v-if="bar" data-id="foo" myProp="prop"></custom></div></template>'
    },
    {
      code: '<template><div><custom v-if="bar" data-id="foo" :myProp="prop"></custom></div></template>'
    },
    {
      code: '<template><div><custom aria-test="bar" :class="$style.foo" myProp="prop"></custom></div></template>'
    },
    {
      code: '<template><div><custom @click="bar" :class="$style.foo" myProp="prop"></custom></div></template>'
    },
    {
      code: '<template><div><custom @click="bar" :class="$style.foo" myProp="prop" ref="myComponent"></custom></div></template>'
    },
    {
      code: '<template><div><custom @click="bar" v-for="(item, index) in items" :class="$style.foo" myProp="prop" ref="myComponent"></custom></div></template>'
    }
  ],

  invalid: [
    {
      code: '<template><div><custom data-id="foo" aria-test="bar" myProp="prop"></custom></div></template>',
      errors: [{
        message: 'Attribute aria-test must go before data-id.',
        type: 'VIdentifier'
      }]
    },
    {
      code: '<template><div><custom data-id="foo" myProp="prop" v-if="bar" ></custom></div></template>',
      errors: [{
        message: 'Attribute v-if must go before myProp.',
        type: 'VDirectiveKey'
      }]
    },
    {
      code: '<template><div><custom data-id="foo" :myProp="prop" v-if="bar"></custom></div></template>',
      errors: [{
        message: 'Attribute v-if must go before :myProp.',
        type: 'VDirectiveKey'
      }]
    },
    {
      code: '<template><div><custom :class="$style.foo"  aria-test="bar" myProp="prop"></custom></div></template>',
      errors: [{
        message: 'Attribute aria-test must go before :class.',
        type: 'VIdentifier'
      }]
    },
    {
      code: '<template><div><custom @click="bar" myProp="prop" :class="$style.foo"></custom></div></template>',
      errors: [{
        message: 'Attribute :class must go before myProp.',
        type: 'VDirectiveKey'
      }]
    },
    {
      code: '<template><div><custom :class="$style.foo" @click="bar" myProp="prop" ref="myComponent"></custom></div></template>',
      errors: [{
        message: 'Attribute @click must go before :class.',
        type: 'VDirectiveKey'
      }]
    },
    {
      code: '<template><div><custom v-for="(item, index) in items"  @click="bar" :class="$style.foo" myProp="prop" ref="myComponent"></custom></div></template>',
      errors: [{
        message: 'Attribute @click must go before v-for.',
        type: 'VDirectiveKey'
      }]
    }
  ]
});
