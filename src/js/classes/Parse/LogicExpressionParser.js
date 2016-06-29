import Parser from './Parser'
import logicOperatorSet from './LogicOperatorSet'

class LogicExpresssionParser extends Parser {
  constructor() {
    super(logicOperatorSet);
  }

  // Separates an input string into an array of symbols and words
  // "Jack^Jill" ~> e.g. ["Jack","^","Jill"]
  _getTokens(string) {
    console.log(string);
    var symbols = this.operatorSet.operators.map( op => op.symbol );
    var regex = new RegExp("\\)|\\(|[a-zA-Z1-9]+|" + symbols.join('|'), "g");
    var tokenList = string.match(regex);
    console.log('Tokens',tokenList);
    return tokenList;
  }
}
window.logic = new LogicExpresssionParser();
export default new LogicExpresssionParser();
