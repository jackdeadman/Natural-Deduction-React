class Rule {
  apply(state, ...lines) {
    if (new.target === Rule) {
      throw new TypeError("Must override apply");
    }
  }
}

export default Rule;
