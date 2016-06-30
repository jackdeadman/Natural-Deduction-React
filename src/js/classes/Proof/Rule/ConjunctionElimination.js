import Expression from '../../Parse/Expression'
import LogicOperatorSet from '../../Parse/LogicOperatorSet'
import logicExpressionParser from '../../Parse/logicExpressionParser'
import Rule from './Rule'
import ProofTree from '../ProofTree'

class ConjunctionElimination extends Rule {
  conditions(state, endpoint, [line1]) {
    var line1Obj = state.line(line1);
    var line1Exp = logicExpressionParser.parse(line1Obj.equation);
    var correctOperator = line1Exp.value === LogicOperatorSet.AND;

    var endPointScope = state.scope(endpoint);

    return correctOperator
            && endPointScope.inScope(line1);
  }

  applyRuleToProof(proof, endpoint, [lineNumber]) {
    var line = proof.line(lineNumber);
    var equation = this.applyRule(line.equation);
    proof.addLine(new ProofTree({
      rule: this.toString([lineNumber]),
      equation
    }));
  }

}

export default ConjunctionElimination;
