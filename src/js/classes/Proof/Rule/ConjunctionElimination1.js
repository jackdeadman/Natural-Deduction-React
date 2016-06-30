import logicExpressionParser from '../../Parse/logicExpressionParser'
import ConjunctionElimination from './ConjunctionElimination'

class ConjunctionElimination1 extends ConjunctionElimination {
  applyRule(expr) {
    var expr = logicExpressionParser.parse(expr);
    return expr.left.toString();
  }

  toString([line]) {
    return `ConjunctionElimination1 ${line}`;
  }
}

export default new ConjunctionElimination1();
