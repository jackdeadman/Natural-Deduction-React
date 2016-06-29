import OperatorSet from './OperatorSet'
import Operator from './Operator'

class LogicOperatorSet extends OperatorSet {
  constructor() {
    var operators = [
      new Operator({
        name: "implies",
        symbol: "→",
        precedence: 1,
        arity: 2
      }),
      new Operator({
        name: "and",
        symbol: "∧",
        precedence: 2,
        arity: 2
      }),
      new Operator({
        name: "or",
        symbol: "∨",
        precedence: 2,
        arity: 2
      }),
      new Operator({
        name: "not",
        symbol: "¬",
        precedence: 3,
        arity: 1
      })
    ];
    super(operators);
  }

}

export default new LogicOperatorSet();
