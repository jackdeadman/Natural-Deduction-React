import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'
import ProofTreeFactory from '../classes/Proof/ProofTreeFactory'

class ProofStore extends EventEmitter {
  constructor() {
    super();
    this.proofState = ProofTreeFactory.createNew(['A→C','B→C','A∨B']);
    var rule1 = ProofTreeFactory.createNew(['1→2','3→4','5∨6']);
    rule1.newScope = true;
    rule1.parent = this.proofState.last();
    this.proofState.children.push(
      rule1
    );

    var rule2 = ProofTreeFactory.createNew(['1→2','3→4','5∨6']);
    rule2.newScope = true;
    rule2.parent = this.proofState.last();
    this.proofState.children.push(
      rule2
    );
    console.log(this.proofState);
  }

  getProofState() {
    return this.proofState;
  }

  addLine(line) {
    this.proofState.children.push(line);
    this.emit('change');
  }

  applyRule(rule, lines) {
    this.proofState = rule.apply(this.proofState, lines);
    this.emit('change');
  }

  handleActions(action) {
    console.log('Action:', action);
    switch (action.type) {
      case 'APPLY_RULE':
        this.applyRule(action.rule, action.lines);
        break;
    }
  }
}

const proofStore = new ProofStore();
dispatcher.register(proofStore.handleActions.bind(proofStore));
export default proofStore;
