import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import logicExpressionParser from '../../Parse/logicExpressionParser'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ConjunctionIntroduction extends Rule {
  apply(leftExpr, rightExpr) {
    var operator = new Expression(LogicOperatorSet.AND);
    operator.left = logicExpressionParser.parse(leftExpr);
    operator.right = logicExpressionParser.parse(rightExpr);

    return operator.toString();
  }
}

export default new ConjunctionIntroduction();
