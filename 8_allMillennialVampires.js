const chai = require('chai');
const expect = chai.expect;

const Vampire = require('../vampire.js');

describe("Vampire", function() {

  let rootVampire;
  beforeEach( function() {
    rootVampire = new Vampire("root");
  });

  describe("allMillennialVampires", function() {

    let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
    beforeEach(() => {
      offspring1 = new Vampire("a", 1946);
      offspring2 = new Vampire("b", 2001);
      offspring3 = new Vampire("c", 1989);
      offspring4 = new Vampire("d", 1801);
      offspring5 = new Vampire("e", 300);
      offspring6 = new Vampire("f", 1);
      offspring7 = new Vampire("g", 909);
      offspring8 = new Vampire("h", 1999);

      rootVampire.addOffspring(offspring1);
      rootVampire.addOffspring(offspring2);
      rootVampire.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
      offspring3.addOffspring(offspring5);
      offspring5.addOffspring(offspring6);
      offspring6.addOffspring(offspring7);
      offspring2.addOffspring(offspring8);
    });

    it("should return 3 for the total number of millenial descendents of the original vampire", () => {
      const result = rootVampire.allMillennialVampires;
      console.log('root vamp millenials: ',result);
      expect(result.length).to.equal(3);
    })

    it("should return 1 for the total number of millenial descendents of vampire 'c'", () => {
      const result = offspring3.allMillennialVampires;
      console.log('vamp 3 vamp millenials: ',result);
      expect(result.length).to.equal(1);
    })
  });
});
