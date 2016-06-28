// Structure to represent a natural deduction proof
class Proof {
  constructor(previousLine = null, ...premises) {

    premises.forEach(line => {
      previousLine = new Proof(previousLine);
    });
    return previousLine;
  }

  isStart() {
    return this.previous === null;
  }

  isEnd() {
    return this.children === [];
  }

  isAssumption() {
    return false;
  }

  static walk(fn) {
    if (!this) return;
    fn(this);
    this.children.forEach(child => {
      Proof.walk.bind(child)(fn);
    });
  }

  static createProof() {
    var proof = {
      equation: 'avb',
      rule: 'Premise',
      isAssumption: () => false,
      children: [
          {
            equation: 'a',
            rule: 'Premise',
            isAssumption: () => true,
            children: [{
              equation: 'bva',
              rule: 'Conjuction Intro',
              isAssumption: () => false,
              children: []
            }]
          },
          {
            equation: 'b',
            rule: 'Premise',
            isAssumption: () => true,
            children: [{
              equation: 'bva',
              rule: 'Conjuction Intro',
              isAssumption: () => false,
              children: []
            }]
          }
      ]
    }
    window.proof = proof;
    return proof;
  }
}

// Just a proof but the premises have been assumed
class Assumption extends Proof{

  constructor(previous, assumed) {
    super();
    this.previous = previous;
    this.data = assumed;
  }

  isAssumption() {
    return true;
  }
}

export default Proof;
