import dispatcher from '../dispatcher';

export function applyRule(name, ...lines) {
  dispatcher.dispatch({
    type: 'APPLY_RULE',
    name,
    lines
  });
}
