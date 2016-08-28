// Abstract class for creating a parser, the parser assumes parens take the
// highest priority. An extention much provide "this.operatorSet"
import Expression from './Expression'

class Parser {
  constructor(operatorSet) {
    this.operatorSet = operatorSet;
    // if (new.target === Parser) {
    //   throw new TypeError("Cannot construct Parser instances directly");
    // }
  }

  _getTokens(string) {
    // if (new.target === Parser) {
    //   throw new TypeError("Must override _getTokens");
    // }
  }

  // Applies the operator that is on top of the operator stack
  // if it's a binary operator use the top two expressions on the
  // expression stack, if unary just use the top.
  // Then add the result to the expression stack.
  _applyOperator(operatorStack, exprStack) {
    var operator = operatorStack.pop();

    if (operator.arity === 0) {
      exprStack.push(new Expression(operator));
    }
    else if (operator.arity === 1){
        var rightExpr = exprStack.pop();
        if (!rightExpr) throw "Invalid number of arguments for " + operator.symbol + " expected 1, 0 given.";

        exprStack.push(new Expression(operator, rightExpr));
    } else if (operator.arity === 2){
        var rightExpr = exprStack.pop();
        var leftExpr = exprStack.pop();
        if (!leftExpr || !rightExpr)
            throw "Invalid number of arguments for " + operator.symbol + " expected 2, "+(!!leftExpr+!!rightExpr)+" given.";
        exprStack.push(new Expression(operator, leftExpr, rightExpr));
    }
  }

  parse(input){
    var operatorStack = [];
    var exprStack = [];
    var tokenList = this._getTokens(input);

    for (var tokenIndex in tokenList){
        var token = tokenList[tokenIndex];
        var operator = this.operatorSet.fromSymbol(token);
        var isOperator = !!operator;

        // If stack is empty or is an opening bracket add the operator to the stack
        if(token === "(" || (operatorStack.length === 0) && (this.operatorSet.isOperator(token))){
            if(isOperator){
                operatorStack.push(operator);
            }else{
                operatorStack.push(token);
            }
        }
        // If a closing bracket, apply everything until it reaches a closing bracket.
        else if(token === ")"){
            while(operatorStack[operatorStack.length-1] !== "("){
                this._applyOperator(operatorStack, exprStack);
            }
            // Pop closing bracket
            operatorStack.pop();
        } else if(isOperator){
            // Add the operator to the op stack if it has a higher precedence
            // Special case for opening bracket as it's not actually an operator, but everythin
            // has an higher precedence
            if(operatorStack[operatorStack.length-1] === "(" || operatorStack[operatorStack.length-1].precedence <= operator.precedence){
                operatorStack.push(operator);
            } else {
                this._applyOperator(operatorStack, exprStack);
                operatorStack.push(operator);
            }
        // Otherwise it is a leaf
        } else {
            exprStack.push(new Expression(token));
        }
    }

    // Once finished going through the string, apply the remaining operatings in the stack
    while(operatorStack.length !== 0){
        this._applyOperator(operatorStack, exprStack);
    }
    var result = exprStack.pop();

    if (exprStack.length) {
      throw 'Failed to parse the expression.';
    }
    return result;
  }
}

export default Parser;
