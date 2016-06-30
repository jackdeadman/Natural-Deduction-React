import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import logicExpressionParser from '../../Parse/logicExpressionParser'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class NegationElimination extends Rule {
  applyRule(expr) {
    return LogicOperatorSet.CONTRADICTION.symbol;
  }

  conditions(state, endpoint, [line1, line2]) {
    var endpointScope = state.line(endpoint);

    var expr1 = logicExpressionParser.parse(state.line(line1));
    var expr2 = logicExpressionParser.parse(state.line(line2));

    var isNegatedVersion = Expression.equals(eq);

    var nottedVersion = logicExpressionParser.parse(LogicOperatorSet.CONTRADICTION);
    nottedVersion.right = expr1;

    return endpointScope.inScope(line1)
            && endpointScope.inScope(line1)
            && Expression.equals(nottedVersion, expr2);
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

export default new NegationElimination();
