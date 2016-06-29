// Structure to represent a proof
class ProofTree {

  static createPremise(equation) {
    return new ProofTree({
      equation,
      rule: 'Premise'
    });
  }

  static createAssumption(equation) {
    return new ProofTree({
      equation,
      rule: 'Assumption',
      newScope: true
    });
  }

  constructor({equation, rule, newScope=false }) {
    this.equation = equation;
    this.rule = rule;
    this.newScope = newScope;
    this.children = [];
  }

  static createNew(premises) {
    var first = new ProofTree({});
    var previous = null;
    premises.forEach(prem => {
      var line = ProofTree.createPremise(prem);
      line.parent = previous;
      if (line.parent === null) {
        first = line;
      } else {
        line.parent.children = [line];
      }
      previous = line;
    });
    return first;
  }

  isAssumption() {
    return this.newScope;
  }

  isEmpty() {
    return this.parent === null && this.children === [];
  }

  size() {
    if (this.isEmpty()) return 0;
    console.log(this.children);
    if (this.children.length)
      return 1 + this.children.map(c=>c.size()).reduce((acc, c)=>acc+c);
    return 1;
  }

  lastNumber() {
    return this.size();
  }

  walk(fn) {
    if (fn(this)) return true;
    if (this.children.length === 0) return;
    this.children.some(child => {
      if (child.walk(fn))
        return true;
    });
  }

  line(lineNumber) {
    var total = 1;
    var line = null;
    this.walk(child => {
      if (lineNumber === total) {
        line = child;
        return true;
      }
      total += 1;
    })
    return line;
  }

  lineNumber() {
    if (this.parent === null) return 1;
    var total = 1 + this.parent.lineNumber();
    this.parent.children.some(c => {
      if (c === this) {
        return true;
      } else {
        total += c.size();
      }
    });
    return total;
  }
}

export default ProofTree;
