// Structure to represent a proof
class ProofTree {

  constructor({equation, rule, newScope=false }) {
    this.equation = equation;
    this.rule = rule;
    this.newScope = newScope;
    this.parent = null;
    this.children = [];
    this.isSound = !newScope;
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

    var index = -1;
    this.children.forEach(child => {
      if (!child.isAssumption()) index++;
    });

    if (index < 0) return this;

    return this.children[index].last();
  }

  setLines() {
    var count = 1;
    this.walk((child) => {
      child.lineNumber = count;
      count ++;
    });
  }

  root() {
    if (this.parent === null) return this;
    return this.parent.root();
  }

  inScope(target, context=this.root()) {
    if (this.lineNumber === target) {
      return true;
    } else {
      if (this.parent === null) return false;
      return this.parent.inScope(target);
    }
  }

  // inScope(line1, line2, context=this.root()) {
  //
  //   if (line1 === line2) return true;
  //   if (line1 > line2) return false;
  //   var line1Obj = context.line(line1);
  //   var line2Obj = context.line(line2);
  //   return this.inScope(line1Obj.lineNumber, line2Obj.parent.lineNumber, context);
  // }

  line(lineNumber) {
    var line = null;
    var count = 1;
    this.walk(child => {
      if (lineNumber === count) line = child;
      count ++;
    });
    return line;
  }

  addLine({equation, rule, newScope=false}) {
    var line = new ProofTree({
      equation,
      rule,
      newScope
    });
    line.parent = this.last();
    this.last().children.push(line);
  }

  addLineNewScope({equation, rule}) {
    var line = new ProofTree({
      equation,
      rule,
      newScope: true
    });
    line.parent = this.last();
    this.children.push(line);
  }
}

// Synonym as it reads better sometimes
ProofTree.prototype.scope = ProofTree.prototype.line;
export default ProofTree;
