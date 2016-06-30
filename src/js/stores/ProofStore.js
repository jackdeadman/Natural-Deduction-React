import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'
import ProofTreeFactory from '../classes/Proof/ProofTreeFactory'
import ProofTree from '../classes/Proof/ProofTree'
import ConjunctionIntroduction from '../classes/Proof/Rule/ConjunctionIntroduction'

class ProofStore extends EventEmitter {
  constructor() {
    super();
    var ps;
    this.proofState = ps = ProofTreeFactory.createNew(['A→C','B→C','A∨B']);
    ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('A'));
    ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('B'));
    ps.scope(4).addLine(new ProofTree({
      equation: 'C',
      rule: 'Implication Elimination'
    }));
    ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('C'));
    ps.setLines();
    ConjunctionIntroduction.applyRuleToProof(ps, 3, [1,2]);
    ps.scope(8).addLineNewScope(ProofTreeFactory.createAssumption('B'));
    ConjunctionIntroduction.applyRuleToProof(ps, 3, [1,3]);

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
