import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import logicExpressionParser from '../../Parse/logicExpressionParser'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ConjunctionIntroduction extends Rule {
  applyRule(leftExpr, rightExpr) {
    var operator = new Expression(LogicOperatorSet.AND);
    operator.left = logicExpressionParser.parse(leftExpr);
    operator.right = logicExpressionParser.parse(rightExpr);

    return operator.toString();
  }

  conditions(state, endpoint, [line1], line2) {
    var endPointScope = state.line(endpoint);
    return endPointScope.inScope(line1)
            && endPointScope.inScope(line2);
  }

  applyRuleToProof(proof, endpoint, [line1], expr) {
    super.applyRuleToProof(proof, endpoint, [line1]);
    var line1 = proof.line(line1);
    var equation = this.applyRule(line1.equation, expr);
    proof.line(endpoint).addLine(new ProofTree({
      rule: this.toString(lines),
      equation
    }));
  }

  toString([line1, line2]) {
    return `Conjunction Introduction ${line1}, ${line2} `;
  }
}

export default new ConjunctionIntroduction();
