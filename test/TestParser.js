// import assert from 'assert';
'use strict';
import path from 'path'
import assert from 'assert';
import LogicExpressionParser from '../src/js/classes/Parse/LogicExpressionParser';

describe('LogicExpressionParser', function() {
  beforeEach(function() {
    this._parser = new LogicExpressionParser();
  });

  describe('#isWellformed()', function() {

    it('should detect a binary operator with only no operands is not well formed', function() {
      assert.strictEqual(this._parser.isWellformed('∧'), false);
    });

    it('should detect a binary operator with only one operand is not well formed', function() {
      assert.strictEqual(this._parser.isWellformed('a∧'), false);
    });

    it('should detect a binary operator with two operands is well formed', function() {
      assert.strictEqual(this._parser.isWellformed('a∧b'), true);
    });

    it('should be able to detect a unary operator with no operands is not well formed', function() {
      assert.strictEqual(this._parser.isWellformed('¬'), false);
    });

    it('should be able to detect a unary operator with one operand is well formed', function() {
      assert.strictEqual(this._parser.isWellformed('¬a'), true);
    });

    it('should be able to detect a unary operator with two operands is not well formed', function() {
      assert.strictEqual(this._parser.isWellformed('a¬a'), false);
    });

    it('should be able to detect the empty expression is well formed', function() {
      assert.strictEqual(this._parser.isWellformed(''), true);
    });

    it('should be able to detect that complex expressions of well formed expressions are well formed', function() {
      assert.strictEqual(this._parser.isWellformed('¬(a∧b)∨(a∧b)'), true);
    });

    it('should be able to detect that complex expressions of not well formed expressions are not well formed', function() {
      assert.strictEqual(this._parser.isWellformed('¬(a∧∧b)∨(a∧b)'), false);
    });
  });

});
