import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ImplicationIntroduction extends Rule {
  applyRule(expr) {
    var operator = new Expression(LogicOperatorSet.NOT);
    operator.right = this.logicExpressionParser.parse(expr);
    return operator.toString();
  }

  conditions(state, endpoint, [lineNumber]) {
    var line = state.line();
    var last = state.line(lineNumber).last();
    var correctSymbol = last.equation().value === LogicOperatorSet.CONTRADICTION
    return state.line(endpoint).inScope(lineNumber) && line.isAssumption() && correctSymbol;
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
    return `Negation Introduction`;
  }
}

export default new ImplicationIntroduction();
