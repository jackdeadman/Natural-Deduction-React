class ProofLine {
  constructor({equation, rule, newScope=false }) {
    this.equation = equation;
    this.rule = rule;
    this.newScope = newScope;
  }

  setChildren(children) {
    this.children = children;
    this.children.forEach(child => child.parent = this);
  }

  static createPremise(equation) {
    return new ProofLine({
      equation,
      rule: 'Premise'
    });
  }

  static createAssumption(equation) {
    return new ProofLine({
      equation,
      rule: 'Assumption',
      newScope: true
    });
  }
}

export default ProofLine;
