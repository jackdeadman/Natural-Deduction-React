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
import DisjunctionIntroduction1 from '../classes/Proof/Rule/DisjunctionIntroduction1'
import DisjunctionIntroduction2 from '../classes/Proof/Rule/DisjunctionIntroduction2'
import BottomElimination from '../classes/Proof/Rule/BottomElimination'
import NegationElimination from '../classes/Proof/Rule/NegationElimination'
import NegationIntroduction from '../classes/Proof/Rule/NegationIntroduction'

import parser from '../classes/Parse/LogicExpressionParser'

class ProofStore extends EventEmitter {
  constructor() {
    super();
    window.parser = parser;
    var ps;
    window.ps = this.proofState = ps = ProofTreeFactory.createNew(['(p∧q)∨(p∧r)']);
    ps.scope(1).addLineNewScope(ProofTreeFactory.createAssumption('(p∧q)'))
    ConjunctionElimination1.applyRuleToProof(ps, 2, [2]);
    ConjunctionElimination2.applyRuleToProof(ps, 3, [2]);
    DisjunctionIntroduction1.applyRuleToProof(ps, 4, [4], 'r')
    ConjunctionIntroduction.applyRuleToProof(ps, 5, [3, 5])

    ps.scope(1).addLineNewScope(ProofTreeFactory.createAssumption('(p∧r)'))
    ConjunctionElimination1.applyRuleToProof(ps, 7, [7]);
    ConjunctionElimination2.applyRuleToProof(ps, 8, [7]);
    DisjunctionIntroduction2.applyRuleToProof(ps, 9, [9], 'q')

    ConjunctionIntroduction.applyRuleToProof(ps, 10, [8, 10])

    DisjunctionElimination.applyRuleToProof(ps, 2, [1, [2, 7]])

    // this.proofState = ps = ProofTreeFactory.createNew(['A→C','D', '¬D']);
    // NegationElimination.applyRuleToProof(ps, 1,[2,3]);
    // ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('B'));
    // NegationElimination.applyRuleToProof(ps, 5, [2,3]);
    // NegationIntroduction.applyRuleToProof(ps, 4, [5]);
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
