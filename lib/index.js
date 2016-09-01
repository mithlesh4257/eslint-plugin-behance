/**
 * @fileoverview Exports custom rules for the Behance plugin
 * @author Annie Zhang
 */
'use strict';

// Plugin Definition

module.exports = {
  rules: {
    'no-deprecated': require('./rules/no-deprecated'),
    'no-test-arrow': require('./rules/no-test-arrow')
  }
};
