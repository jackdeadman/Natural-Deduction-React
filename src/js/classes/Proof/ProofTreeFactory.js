import ProofTree from './ProofTree'

class ProofTreeFactory {
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

  static createNew(premises) {
    var first = new ProofTree({});
    var previous = null;
    premises.forEach(prem => {
      var line = ProofTreeFactory.createPremise(prem);
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
}

export default ProofTreeFactory;
