import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class BottomElimination extends Rule {
  applyRule(expr) {
    return expr;
  }

  conditions(state, endpoint, [line1]) {
    var line1Exp = this.logicExpressionParser.parse(state.line(line1).equation);
    var correctOperator = line1Exp.value === LogicOperatorSet.CONTRADICTION;
    return state.scope(endpoint).inScope(line1) && correctOperator;
  }

  applyRuleToProof(proof, endpoint, [line], newExpr) {
    super.applyRuleToProof(proof, endpoint, [line]);
    var equation = this.applyRule(newExpr);
    proof.line(endpoint).addLine(new ProofTree({
      rule: this.toString([line]),
      equation
    }));
  }

  toString([line1]) {
    return `Bottom Elimination ${line1}`;
  }
}

export default new BottomElimination();
