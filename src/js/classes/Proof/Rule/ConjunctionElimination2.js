import logicExpressionParser from '../../Parse/logicExpressionParser'
import ConjunctionElimination from './ConjunctionElimination'

class ConjunctionElimination2 extends ConjunctionElimination {
  applyRule(expr) {
    var expr = logicExpressionParser.parse(expr);
    return expr.right.toString();
  }

  toString([line]) {
    return `ConjunctionElimination2 ${line}`;
  }
}

export default new ConjunctionElimination2();
