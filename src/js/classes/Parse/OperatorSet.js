import _ from 'underscore'

class OperatorSet {

  constructor(operators) {
    this.operators = operators;
    // if (new.target === OperatorSet) {
    //   throw new TypeError("Cannot construct OperatorSet instances directly");
    // }

    // Meta programming add methods like LogicOperatorSet.NOT
    this.operators.forEach(op => {
      this[op.name.toUpperCase()] = op;
    });
  }

  // Return an operator from a symbol, undefined if doesnt match
  fromSymbol(string) {
    // if (new.target === OperatorSet) {
    //   throw new TypeError("Must override fromSymbol");
    // }
  }

  // Predicate to check a string is a operator
  isOperator(symbol){
      return !!this.fromSymbol(symbol)
  }

  // Given a string convert the string to an operator
  fromSymbol(symbol) {
    return _.find( this.operators, op => op.symbol === symbol );
  }

}

export default OperatorSet
