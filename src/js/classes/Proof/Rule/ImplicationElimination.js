import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import logicExpressionParser from '../../Parse/logicExpressionParser'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ImplicationElimination extends Rule {
  applyRule(leftExpr, rightExpr) {
    var leftExpr = logicExpressionParser.parse(leftExpr);
    return leftExpr.right.toString();
  }

  conditions(state, endpoint, [line1, line2]) {
    var line1Obj = state.line(line1);
    var line2Obj = state.line(line2);

    var line1Exp = logicExpressionParser.parse(line1Obj.equation);
    var line2Exp = logicExpressionParser.parse(line2Obj.equation);

    var correctOperator = line1Exp.value === LogicOperatorSet.IMPLIES;
    var follows = Expression.equals(line1Exp.left, line2Exp);

    var endPointScope = state.scope(endpoint);

    return correctOperator
            && follows
            && endPointScope.inScope(line1)
            && endPointScope.inScope(line2);
  }

  applyRuleToProof(proof, endpoint, lines) {
    var line1 = proof.line(lines[0]);
    var line2 = proof.line(lines[1]);
    var equation = this.applyRule(line1.equation, line2.equation);
    proof.line(endpoint).addLine(new ProofTree({
      rule: this.toString(lines),
      equation
    }));
  }

  toString([line1, line2]) {
    return `Implication Elimination ${line1}, ${line2}`;
  }
}

export default new ImplicationElimination();
