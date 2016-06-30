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

  conditions(state, endpoint, lines) {
    var endPointScope = state.line(endpoint);
    return endPointScope.inScope(lines[0])
            && endPointScope.inScope(lines[1]);

  }

  applyRuleToProof(proof, endpoint, lines) {
    super.applyRuleToProof(proof, endpoint, lines);
    var line1 = proof.line(lines[0]);
    var line2 = proof.line(lines[1]);
    var equation = this.applyRule(line1.equation, line2.equation);
    proof.addLine(new ProofTree({
      rule: this.toString(),
      equation
    }));
  }

  toString() {
    return 'Conjunction Introduction';
  }
}

export default new ConjunctionIntroduction();
