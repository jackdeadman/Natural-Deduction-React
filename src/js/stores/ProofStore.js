import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'
import ProofTreeFactory from '../classes/Proof/ProofTreeFactory'
import ProofTree from '../classes/Proof/ProofTree'
import ConjunctionIntroduction from '../classes/Proof/Rule/ConjunctionIntroduction'
import ImplicationIntroduction from '../classes/Proof/Rule/ImplicationIntroduction'
import ImplicationElimination from '../classes/Proof/Rule/ImplicationElimination'
import DoubleNegationIntroduction from '../classes/Proof/Rule/DoubleNegationIntroduction'
import DoubleNegationElimination from '../classes/Proof/Rule/DoubleNegationElimination'
import ConjunctionIntroduction1 from '../classes/Proof/Rule/ConjunctionElimination1'
import ConjunctionIntroduction2 from '../classes/Proof/Rule/ConjunctionElimination2'
import DisjunctionElimination from '../classes/Proof/Rule/DisjunctionElimination'

import parser from '../classes/Parse/LogicExpressionParser'

class ProofStore extends EventEmitter {
  constructor() {
    super();
    window.parser = parser;
    var ps;
    this.proofState = ps = ProofTreeFactory.createNew(['A→C','B→C','A∨B', '⊥']);
    ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('A'));

    ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('B'));
      ImplicationElimination.applyRuleToProof(ps,4,[1,4]);
      ImplicationElimination.applyRuleToProof(ps,6,[2,6]);
      DisjunctionElimination.applyRuleToProof(ps,3,[3,[4,6]]);

    ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('B'));
      ConjunctionIntroduction.applyRuleToProof(ps, 9, [8,9]);
    ImplicationIntroduction.applyRuleToProof(ps, 9, [9]);
    DoubleNegationIntroduction.applyRuleToProof(ps, 11, [11]);
    DoubleNegationElimination.applyRuleToProof(ps, 12, [12]);


    // ps.scope(4).addLine(new ProofTree({
    //   equation: 'C',
    //   rule: 'Implication Elimination'
    // }));
    // ps.setLines();
    // ConjunctionIntroduction.applyRuleToProof(ps, 3, [1,2]);
    // ps.setLines();
    // ImplicationIntroduction.applyRuleToProof(ps, 3, [4]);
    //
    // ps.setLines();
    // ImplicationIntroduction.applyRuleToProof(ps, 7, [7]);
    //
    // ps.setLines();
    // ImplicationElimination.applyRuleToProof(ps, 4, [1,3]);
    //
    // ps.setLines();
    // DoubleNegationIntroduction.applyRuleToProof(ps, 10, [10]);
    //
    // ps.setLines();
    // ConjunctionIntroduction1.applyRuleToProof(ps, 9, [9]);
    //
    // ps.setLines();
    // ConjunctionIntroduction2.applyRuleToProof(ps, 9, [9]);

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
