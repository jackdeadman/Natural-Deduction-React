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
    if (this.conditions(proof, endpoint, lines)) {
      var line1 = proof.line(lines[0]);
      var line2 = proof.line(lines[1]);
      var equation = this.applyRule(line1.equation, line2.equation);
      proof.addLine({
        rule: 'Conjunction Introduction',
        equation
      });
    } else {
      // throw new Error('Conditions not met to apply rule');
      console.log('Error');
    }
  }
}

export default new ConjunctionIntroduction();
