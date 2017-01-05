# eslint-plugin-behance

Custom rules! Yeah!

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-behance`:

```
$ npm install eslint-plugin-behance --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-behance` globally.

## Usage

Add `behance` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "behance"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "behance/rule-name": 2
    }
}
```

## Supported Rules

* `no-deprecated`: Allows you to blacklist any deprecated `import` statements or member expressions
  * Options: this rule takes in two object arguments, whose property names are the deprecated items and property values are the suggested replacement items
    * `imports`: deprecated libraries and their replacements
    * `expressions`: deprecated member expressions and their replacements

* `no-test-arrow`: Disallows arrow functions as arguments to Jasmine test functions (`describe`, `it`, `beforeEach`, `beforeAll`, `afterEach`, `afterAll`).

* `no-generators`: Disallows using generators (function *)

