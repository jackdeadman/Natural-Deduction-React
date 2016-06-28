import OperatorSet from './OperatorSet'
import Operator from './Operator'
import _ from 'underscore'

class LogicOperatorSet extends OperatorSet {
  constructor() {
    super();
    this.operators = [
      new Operator({
        name: "implies",
        symbol: "=>",
        precedence: 1,
        arity: 2
      }),
      new Operator({
        name: "and",
        symbol: "^",
        precedence: 2,
        arity: 2
      }),
      new Operator({
        name: "or",
        symbol: "+",
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

  }

  // Given a string convert the string to an operator
  fromSymbol(symbol) {
    return _.find( this.operators, op => op.symbol === symbol );
  }
}

const logicOperatorSet = new LogicOperatorSet();

// Meta programming add methods like LogicOperatorSet.NOT
logicOperatorSet.operators.forEach(op => {
  logicOperatorSet[op.name.toUpperCase()] = op;
});

export default logicOperatorSet;
