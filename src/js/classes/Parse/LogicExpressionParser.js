import Parser from './Parser'
import logicOperatorSet from './LogicOperatorSet'

class LogicExpresssionParser extends Parser {
  constructor() {
    super(logicOperatorSet);
  }

  // Separates an input string into an array of symbols and words
  // "Jack^Jill" ~> e.g. ["Jack","^","Jill"]
  _getTokens(string) {
    var symbols = this.operatorSet.operators.map( op => op.symbol );
    var regex = new RegExp("\\)|\\(|[a-zA-Z]+|" + symbols.join('|'), "g");
    var tokenList = string.match(regex);
    return tokenList;
  }
}

export default new LogicExpresssionParser()
