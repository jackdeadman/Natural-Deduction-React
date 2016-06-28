class OperatorSet {

  constructor() {
    this.operators = [];
    if (new.target === OperatorSet) {
      throw new TypeError("Cannot construct OperatorSet instances directly");
    }
  }

  // Return an operator from a symbol, undefined if doesnt match
  fromSymbol(string) {
    if (new.target === OperatorSet) {
      throw new TypeError("Must override fromSymbol");
    }
  }

  // Predicate to check a string is a operator
  isOperator(symbol){
      return !!this.fromSymbol(symbol)
  }

}

export default OperatorSet
