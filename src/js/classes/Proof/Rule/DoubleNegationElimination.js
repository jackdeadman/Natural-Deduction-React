import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class DoubleNegationElimination extends Rule {
  applyRule(expr) {
    var expr = this.logicExpressionParser.parse(expr);
    return expr.right.right.toString();
  }

  conditions(state, endpoint, [line]) {
    var expr = this.logicExpressionParser.parse(state.line(line));

    return state.scope(endpoint).inScope(line)
            && expr.right.value === LogicOperatorSet.NOT
            && expr.right.right.value === LogicOperatorSet.NOT;
  }

  applyRuleToProof(proof, endpoint, [line]) {
    var equation = this.applyRule(proof.line(line).equation);
    proof.line(endpoint).addLine(new ProofTree({
      rule: this.toString([line]),
      equation
    }));
  }

  toString([line1]) {
    return `Double Negation Elimination ${line1}`;
  }
}

export default new DoubleNegationElimination();
