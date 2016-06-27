// Structure to represent a natural deduction proof
class Proof {
  constructor(premises, previousLine) {
    this.children = [];
    this.data = null;
    this.rule = null;
    this.previous = previousLine || null;

    if (premises !== undefined) {
      var previousLine = null;
      var lines = premises.map(prem => {
        var line = new Proof();
        line.data = prem;
        line.rule = 'Premise';
        // Create a two way link, only one child as
        // all premises are in the same scope
        if (previousLine !== null) {
          previousLine.children = [line];
        }
        line.previous = previousLine;
        previousLine = line;
      });
    }

  }

  isStart() {
    return this.previous === null;
  }

  isEnd() {
    return this.children === [];
  }

  static createProof() {
    var line1 = new Proof(['A^B'])
    var ass = new Assumption(line1, 'A');
    ass.children = new Proof(['a','b'], ass);

    line1.children = [
      ass,
      new Assumption(line1, 'B')
    ];
    return line1;
  }
}

// Just a proof but the premises have been assumed
class Assumption extends Proof{

  constructor(previous, assumed) {
    super();
    this.previous = previous;
    this.data = assumed;
  }
}

export default Proof;
