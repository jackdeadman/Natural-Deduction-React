class Operator {
  constructor({ name, symbol, precedence, arity} ) {
    this.name = name;
    this.symbol = symbol;
    this.precedence = precedence;
    this.arity = arity;
  }
}

export default Operator;
