import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ConjunctionIntroduction extends Rule {
  applyRule(leftExpr, rightExpr) {
    var operator = new Expression(LogicOperatorSet.AND);
    operator.left = this.logicExpressionParser.parse(leftExpr);
    operator.right = this.logicExpressionParser.parse(rightExpr);

    return operator.toString();
  }

  conditions(state, endpoint, [line1, line2]) {
    var endPointScope = state.line(endpoint);
    console.log(endPointScope.inScope(line1), endPointScope.inScope(line2));
    return endPointScope.inScope(line1)
            && (endPointScope.inScope(line2));
  }

  applyRuleToProof(proof, endpoint, lines) {
    super.applyRuleToProof(proof, endpoint, lines);
    var [line1, line2] = lines;
    var line1 = proof.line(line1);
    var line2 = proof.line(line2);

    var equation = this.applyRule(line1.equation, line2.equation);
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
