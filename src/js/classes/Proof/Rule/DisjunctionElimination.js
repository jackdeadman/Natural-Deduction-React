import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import logicExpressionParser from '../../Parse/logicExpressionParser'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class DisjunctionElimination extends Rule {
  applyRule(expr) {
    return expr;
  }

  conditions(state, endpoint, [line1, assummedlines]) {
    var assline1 = state.line(assummedlines[0]);
    var assline2 = state.line(assummedlines[1]);
    var line1 = state.line(line1);

    // console.log(assline1.last(), assline2.last());

    var correctOperator = logicExpressionParser.parse(line1.equation).value === LogicOperatorSet.OR;
    var areAssumptions = assline1.isAssumption() && assline2.isAssumption();
    console.log(line1.equation, assline1.equation, assline2.equation);
    return correctOperator && areAssumptions && (assline1.last().equation === assline2.last().equation);
  }

  applyRuleToProof(proof, endpoint, [line, lines]) {
    super.applyRuleToProof(proof, endpoint, [line, lines]);
    var equation = this.applyRule(proof.line(lines[0]).last().equation);
    proof.line(endpoint).parent.children.push(new ProofTree({
      rule: this.toString([line]),
      equation
    }));

    proof.line(lines[0]).closeBox();
    proof.line(lines[1]).closeBox();
    proof.setLines();
  }

  toString([line1]) {
    return `Disjunction Elimination`;
  }
}

export default new DisjunctionElimination();
