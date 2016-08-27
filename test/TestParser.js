// import assert from 'assert';
'use strict';
import path from 'path'
import assert from 'assert';
import LogicExpressionParser from '../src/js/classes/Parse/LogicExpressionParser';

describe('LogicExpressionParser', function() {
  describe('#isWellformed()', function() {

    beforeEach(function() {
      this._parser = new LogicExpressionParser();
    });

    it('should detect a binary expression with only one operand is not well formed', function() {
      assert.strictEqual(this._parser.isWellformed('a∧'), false);
    });

    it('should detect a binary expression with two operands is well formed', function() {
      assert.strictEqual(this._parser.isWellformed('a∧b'), true);
    });
  })
});
