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
      data: '1',
      rule: 'Premise',
      isAssumption: () => true,
      children: [
        {
          data: '2',
          rule: 'Assumption',
          isAssumption: () => true,
          children: [{
            data: '3',
            rule: 'Disjuction Intro Intro',
            isAssumption: () => false,
            children: [{
              data: '4',
              rule: 'Premise',
              isAssumption: () => false,
              children: [{
                data: '5',
                rule: 'Premise',
                isAssumption: () => false,
                children: []
              }]
            }]
          }]
        },
        {
        data: '6',
        rule: 'Premise',
        isAssumption: () => true,
        children: [
          {
            data: '7',
            rule: 'Assumption',
            isAssumption: () => true,
            children: [{
              data: '8',
              rule: 'Disjuction Intro Intro',
              isAssumption: () => true,
              children: [{
                data: '9',
                rule: 'Premise',
                isAssumption: () => false,
                children: [{
                  data: '10',
                  rule: 'Premise',
                  isAssumption: () => false,
                  children: []
                }]
              }]
            }]
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
