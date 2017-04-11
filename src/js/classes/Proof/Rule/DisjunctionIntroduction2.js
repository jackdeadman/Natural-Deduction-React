import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import logicExpressionParser from '../../Parse/logicExpressionParser'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class DisjunctionIntroduction2 extends Rule {
  applyRule(leftExpr, rightExpr) {
    var operator = new Expression(LogicOperatorSet.OR);
    operator.left = logicExpressionParser.parse(leftExpr);
    operator.right = logicExpressionParser.parse(rightExpr);
    return operator.toString();
  }

  conditions(state, endpoint, [line1]) {
    return state.scope(endpoint).inScope(line1);
  }

  applyRuleToProof(proof, endpoint, [line], newExpr) {
    super.applyRuleToProof(proof, endpoint, [line]);
    var equation = this.applyRule(newExpr, proof.line(line).equation);
    proof.line(endpoint).addLine(new ProofTree({
      rule: this.toString([line]),
      equation
    }));
  }

  toString([line1]) {
    return `Disjunction Introduction2 ${line1}`;
  }
}

export default new DisjunctionIntroduction2();
