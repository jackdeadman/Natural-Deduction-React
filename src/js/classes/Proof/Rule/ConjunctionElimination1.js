import ConjunctionElimination from './ConjunctionElimination'

class ConjunctionElimination1 extends ConjunctionElimination {
  applyRule(expr) {
    var expr = this.logicExpressionParser.parse(expr);
    return expr.left.toString();
  }

  toString([line]) {
    return `ConjunctionElimination1 ${line}`;
  }
}

export default new ConjunctionElimination1();
