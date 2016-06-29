import dispatcher from '../dispatcher';

export function applyRule(rule, ...lines) {
  dispatcher.dispatch({
    type: 'APPLY_RULE',
    rule,
    lines
  });
}
