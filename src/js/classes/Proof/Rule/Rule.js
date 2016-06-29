import logicExpressionParser from '../../Parse/logicExpressionParser'

class Rule {

  apply(...lines) {
    if (new.target === Rule) {
      throw new TypeError("Must override apply");
    }
  }

  getExpression(state, line) {
    return logicExpressionParser.parse(state.line(line).equation);
  }

}

export default Rule;
