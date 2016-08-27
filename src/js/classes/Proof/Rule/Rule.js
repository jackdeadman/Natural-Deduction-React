import logicExpressionParser from '../../Parse/logicExpressionParser'

class Rule {

  applyRule(...lines) {
    // if (new.target === Rule) {
    //   throw new TypeError("Must override applyRule");
    // }
  }

  conditions(...lines) {
    // if (new.target === Rule) {
    //   throw new TypeError("Must override conditions");
    // }
  }

  applyRuleToProof(proof, endpoint, lines) {
    // if (new.target === Rule) {
    //   throw new TypeError("Must override apply");
    // }

    if (!this.conditions(proof, endpoint, lines)) {
      throw new Error('Conditions not met to apply rule');
    }
  }

}

export default Rule;
