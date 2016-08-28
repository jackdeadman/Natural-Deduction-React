import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class DoubleNegationIntroduction extends Rule {
  applyRule(expr) {
    var expr = this.logicExpressionParser.parse(expr);
    var node1 = new Expression(LogicOperatorSet.NOT);
    var node2 = new Expression(LogicOperatorSet.NOT);
    node1.right = node2;
    node2.right = expr;
    return node1.toString();
  }

  conditions(state, endpoint, [line1]) {
    return state.scope(endpoint).inScope(line1);
  }

  applyRuleToProof(proof, endpoint, [line]) {
    var equation = this.applyRule(proof.line(line).equation);
    proof.line(endpoint).addLine(new ProofTree({
      rule: this.toString([line]),
      equation
    }));
  }

  toString([line1]) {
    return `Double Negation Introduction ${line1}`;
  }
}

export default new DoubleNegationIntroduction();
