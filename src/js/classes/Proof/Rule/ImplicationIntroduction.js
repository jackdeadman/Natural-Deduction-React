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

  applyRuleToProof(proof, endpoint, lines) {
    super.applyRuleToProof(proof, endpoint, lines);
    var line1 = proof.line(lines[0]);
    var line2 = line1.last();

    var equation = this.applyRule(line1.equation, line2.equation);

    var newLine = new ProofTree({
      rule: this.toString(),
      equation
    });

    var index = 0;
    line1.parent.children.some(child =>{
      if (line1.lineNumber === child.lineNumber) {
        return true;
      }
      index++;
    });

    if (index >= 0) {
      var newParent = line1.parent;
      line1.closeBox();
      newParent.children.splice(index+1, 0, newLine);
      newLine.parent = newParent
    }
  }

  toString() {
    return "Implication Introduction";
  }
}

export default new ImplicationIntroduction();
