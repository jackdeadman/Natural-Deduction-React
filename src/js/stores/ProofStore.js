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
    ps.scope(1).addLineNewScope(ProofTreeFactory.createAssumption('B'));
    ps.scope(3).addLineNewScope(ProofTreeFactory.createAssumption('F'));
    ps.scope(4).addLine(new ProofTree({
      equation: 'A→D',
      rule: 'Made up rule'
    }));

    ps.scope(5).addLine(new ProofTree({
      equation: 'A→D',
      rule: 'Another Made up rule'
    }));

    ps.scope(6).addLineNewScope(new ProofTree({
      equation: 'A→D',
      rule: 'Another Made up rule'
    }));

    ps.scope(4).addLine(new ProofTree({
      equation: 'A→D',
      rule: 'Third Made up rule'
    }));

    // if (this.proofState.line(4).inScope(1)) {
    //   var line1 = this.proofState.line(1);
    //   var line2 = this.proofState.line(2);
    //   var equation = ConjunctionIntroduction.apply(line1.equation, line2.equation);
    //   this.proofState.line(4).addLine({
    //     equation,
    //     rule: 'Conjunction Introduction'
    //   });
    // }
    //
    // if (this.proofState.line(6).inScope(1)) {
    //   var line1 = this.proofState.line(1);
    //   var line2 = this.proofState.line(4);
    //   var equation = ConjunctionIntroduction.apply(line1.equation, line2.equation);
    //   this.proofState.line(6).addLine({
    //     equation,
    //     rule: 'Conjunction Introduction'
    //   });
    // } else {
    //   console.log('Rule cant be applied');
    // }

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
