import logicExpressionParser from '../../Parse/logicExpressionParser'
import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ConjunctionIntroduction extends Rule {
  apply(state, [line1, line2]) {
    var operator = new Expression(LogicOperatorSet.AND);
    var leftExpr = logicExpressionParser.parse(state.line(line1).equation);
    var rightExpr = logicExpressionParser.parse(state.line(line2).equation);

    operator.left = leftExpr;
    operator.right = rightExpr;
    state.children.push(new ProofTree({
      equation: operator.toString(),
      rule: 'Conjuction Introduction'
    }));

    state.children[state.children.length-1].parent = state;
    return state;
  }
}

export default new ConjunctionIntroduction();
