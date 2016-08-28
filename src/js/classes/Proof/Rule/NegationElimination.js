import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class NegationElimination extends Rule {
  applyRule() {
    return LogicOperatorSet.CONTRADICTION.symbol;
  }

  conditions(state, endpoint, [line1, line2]) {
    var endpointScope = state.line(endpoint);

    var expr1 = this.logicExpressionParser.parse(state.line(line1));
    var expr2 = this.logicExpressionParser.parse(state.line(line2));

    var isNegatedVersion = Expression.equals(eq);

    var nottedVersion = this.logicExpressionParser.parse(LogicOperatorSet.CONTRADICTION);
    nottedVersion.right = expr1;

    return endpointScope.inScope(line1)
            && endpointScope.inScope(line1)
            && Expression.equals(nottedVersion, expr2);
  }

  applyRuleToProof(proof, endpoint, [line1, line2]) {
    var equation = this.applyRule();
    proof.line(endpoint).addLine(new ProofTree({
      rule: this.toString([line1, line2]),
      equation
    }));
  }

  toString([line1, line2]) {
    return `Negation Elimination ${line1}, ${line2}`;
  }
}

export default new NegationElimination();
