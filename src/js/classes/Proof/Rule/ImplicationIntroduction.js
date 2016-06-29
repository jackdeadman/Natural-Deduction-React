import logicExpressionParser from '../../Parse/logicExpressionParser'
import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ImplicationIntroduction extends Rule {
  apply(state, [line]) {
    if (line.newScope) {
      var operator = new Expression(LogicOperatorSet.IMPLIES);
      var last = line.last();
      line.children = [];
      operator.left = line;
      operator.right = last;

      state.children.push(new ProofTree({
        equation: operator.toString(),
        rule: 'Implication Introduction'
      }));
      return state;
    }
  }
}

export default new ImplicationIntroduction();
