import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'

class ProofStore extends EventEmitter {
  constructor() {
    super();
    this.proofState = {
      equation: 'avb',
      rule: 'Premise',
      isAssumption: () => false,
      lineNumber: 1,
      children: [
          {
            equation: 'a',
            rule: 'Assumption',
            isAssumption: () => true,
            lineNumber: 2,
            children: [{
              equation: 'bva',
              rule: 'Conjuction Intro',
              lineNumber: 3,
              isAssumption: () => false,
              children: []
            }]
          },
          {
            equation: 'b',
            rule: 'Assumption',
            lineNumber: 4,
            isAssumption: () => true,
            children: [{
              equation: 'bva',
              rule: 'Conjuction Intro',
              lineNumber: 5,
              isAssumption: () => false,
              children: []
            }]
          },
          {
            equation: 'bva',
            rule: 'Disjuction elim',
            isAssumption: () => false,
            lineNumber: 6,
            children: []
          }

      ]
    };

  }

  getProofState() {
    return this.proofState;
  }

  addLine(line) {
    this.proofState.children.push(line);
    this.emit('change');
  }

  handleActions(action) {
    switch (action.type) {
      case 'APPLY_RULE':
        console.log('Applying rule:', action);
        break;
    }
  }
}

const proofStore = new ProofStore();
dispatcher.register(proofStore.handleActions.bind(proofStore));
export default proofStore;
