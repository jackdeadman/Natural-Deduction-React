import logicExpressionParser from '../../Parse/logicExpressionParser'
import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ConjunctionIntroduction extends Rule {
  apply(state, [line1, line2]) {
    var root = new Expression(LogicOperatorSet.AND);
    var tree1 = logicExpressionParser.parse(state.line(line1).equation);
    var tree2 = logicExpressionParser.parse(state.line(line2).equation);

    root.left = tree1;
    root.right = tree2;
    state.children.push(new ProofTree({
      equation: root.toString(),
      rule: 'Conjuction Introduction'
    }));

    state.children[state.children.length-1].parent = state;
    return state;
  }
}

export default new ConjunctionIntroduction();
