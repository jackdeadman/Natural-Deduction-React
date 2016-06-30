import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'
import ProofTreeFactory from '../classes/Proof/ProofTreeFactory'
import ProofTree from '../classes/Proof/ProofTree'
import ConjunctionIntroduction from '../classes/Proof/Rule/ConjunctionIntroduction'
import ImplicationIntroduction from '../classes/Proof/Rule/ImplicationIntroduction'
import ImplicationElimination from '../classes/Proof/Rule/ImplicationElimination'
import DoubleNegationIntroduction from '../classes/Proof/Rule/DoubleNegationIntroduction'
import DoubleNegationElimination from '../classes/Proof/Rule/DoubleNegationElimination'
import ConjunctionElimination1 from '../classes/Proof/Rule/ConjunctionElimination1'
import ConjunctionElimination2 from '../classes/Proof/Rule/ConjunctionElimination2'
import DisjunctionElimination from '../classes/Proof/Rule/DisjunctionElimination'
import DisjunctionIntroduction from '../classes/Proof/Rule/DisjunctionIntroduction'
import BottomElimination from '../classes/Proof/Rule/BottomElimination'
import NegationElimination from '../classes/Proof/Rule/NegationElimination'

import parser from '../classes/Parse/LogicExpressionParser'

class ProofStore extends EventEmitter {
  constructor() {
    super();
    window.parser = parser;
    var ps;
    this.proofState = ps = ProofTreeFactory.createNew(['A→C','D', '¬D']);
    NegationElimination.applyRuleToProof(ps, 1,[2,3]);
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
