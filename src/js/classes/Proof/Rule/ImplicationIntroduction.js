import logicExpressionParser from '../../Parse/logicExpressionParser'
import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ImplicationIntroduction extends Rule {
  applyRule(leftExpr, rightExpr) {
    var operator = new Expression(LogicOperatorSet.IMPLIES);
    operator.left = logicExpressionParser.parse(leftExpr);
    operator.right = logicExpressionParser.parse(rightExpr);

    return operator.toString();
  }

  conditions(state, endpoint, [lineNumber]) {
    return state.line(lineNumber).isAssumption();
  }

  applyRuleToProof(proof, endpoint, [lineNumber1]) {
    var line1 = proof.line(lineNumber1);
    var line2 = line1.last();

    var equation = this.applyRule(line1.equation, line2.equation);
    var newLine = new ProofTree({
      rule: this.toString([line1.lineNumber, line2.lineNumber]),
      equation
    });

    line1.closeBox();
    proof.line(endpoint).parent.children.push(newLine);
    newLine.parent = line1.parent;
    proof.setLines();
  }

  toString([line1, line2]) {
    return `Implication Introduction`;
  }
}

export default new ImplicationIntroduction();
