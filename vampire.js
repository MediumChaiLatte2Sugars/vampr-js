class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no creator is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {

    const currentVampireSeniorityRank = this.numberOfVampiresFromOriginal;
    const otherVampireSeniorityRank = vampire.numberOfVampiresFromOriginal;

    // Check for original vampire
    if (this.creator === null) {
      return true;
    }

    // Check if other vampire is original
    if (vampire.creator === null) {
      return false;
    }

    if (!(currentVampireSeniorityRank < otherVampireSeniorityRank)) {
      return false;
    }

    return true;

  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    let foundVampire = null;

    if (this.name === name) {
      return this;
    }

    for (let offspring of this.offspring) {
      foundVampire = offspring.vampireWithName(name);
    }

    return foundVampire;

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

    let total = 0;

    if (this.offspring.length){
      total += this.offspring.length;
    }

    for (let offspring of this.offspring){
      total += offspring.totalDescendents;
    }

    return total;

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

    let totalVampires = [];

    if (this.yearConverted > 1980){
      totalVampires.push(this);
    }

    for (let descendant of this.offspring){
      const millenialVampires = descendant.allMillennialVampires;
      totalVampires = [...totalVampires, ...millenialVampires];
    }

    return totalVampires;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // Orginal vampire check (current vampire)
    if (this.creator === null) {
      return this;
    }

    // Original vampire check (other vampire)
    if (vampire.creator === null) {
      return vampire;
    }

    // Same vampire
    if (this === vampire) {
      return this;
    }

    // Sibling check
    if (this.creator.offspring.includes(vampire)) {
      return this.creator;
    }

    // Obtain ancestors
    let currentVampireAncestors = this.ancestors();
    let otherVampireAncestors = vampire.ancestors();

    // Check containment in ancestors
    for (let ancestor of currentVampireAncestors) {
      if (otherVampireAncestors.includes(ancestor)) {
        return ancestor;
      }
    }


  }

  // returns an array of all of the vampire's ancestors
  ancestors() {
    let vampireAncestors = [];
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no creator is found
    while (currentVampire.creator) {
      vampireAncestors.push(currentVampire);
      currentVampire = currentVampire.creator;
    }

    if (!currentVampire.creator) {
      vampireAncestors.push(currentVampire);
    }

    return vampireAncestors;
  }
}

module.exports = Vampire;

