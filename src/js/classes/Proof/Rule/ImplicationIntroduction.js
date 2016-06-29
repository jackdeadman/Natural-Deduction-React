import logicExpressionParser from '../../Parse/logicExpressionParser'
import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ImplicationIntroduction extends Rule {
  apply(state, [line]) {
    var line = state.line(line);
    if (line.newScope) {
      var operator = new Expression(LogicOperatorSet.IMPLIES);
      console.log(line);
      var leftExpr = logicExpressionParser.parse(line.equation);
      var rightExpr = logicExpressionParser.parse(line.last().equation);

      operator.left = leftExpr;
      operator.right = rightExpr;

      state.children.push(new ProofTree({
        equation: operator.toString(),
        rule: 'Implication Introduction'
      }));
      console.log(operator);
      return state;
    }
  }
}

export default new ImplicationIntroduction();
