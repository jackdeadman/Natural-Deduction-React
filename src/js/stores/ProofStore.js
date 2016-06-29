import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'
import ProofTree from '../classes/Proof/ProofTree'

class ProofStore extends EventEmitter {
  constructor() {
    super();
    this.proofState = ProofTree.createNew(['a','b','a^b']);

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
