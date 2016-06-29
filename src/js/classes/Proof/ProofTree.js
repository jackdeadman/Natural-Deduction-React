// Structure to represent a proof
class ProofTree {

  constructor({equation, rule, newScope=false }) {
    this.equation = equation;
    this.rule = rule;
    this.newScope = newScope;
    this.children = [];
  }

  isAssumption() {
    return this.newScope;
  }

  isEmpty() {
    return this.parent === null && this.children === [];
  }

  size() {
    if (this.isEmpty()) return 0;
    if (this.children.length)
      return 1 + this.children.map(c=>c.size()).reduce((acc, c)=>acc+c);
    return 1;
  }

  lastNumber() {
    return this.size();
  }

  walk(fn) {
    fn(this);
    this.children.forEach(child => {
      child.walk(fn);
    });
  }

  last() {
    if (this.children.length === 0) return this;
    return this.children[this.children.length-1].last();
  }

  setLines() {
    console.log('Set lines');
    var count = 1;
    this.walk((child) => {
      child.lineNumber = count;
      count ++;
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
}

export default ProofTree;
