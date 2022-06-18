const names = [
  "Mr. A. John Smith",
  "Mr. G. Jones",
  "mr & mrs smith",
  "Dr and Mrs James Spade",
  "Miss Allen",
  "MR ANDY PRINGLE",
];

let people = [];

class Person {
  constructor(title, initial, first_name, last_name) {
    function convertToString(attribute) {
      return attribute ? attribute.toString().toUpperCase() : null;
    }

    (this.title = convertToString(title)),
      (this.initial = convertToString(initial)),
      (this.first_name = convertToString(first_name)),
      (this.last_name = convertToString(last_name));
  }
}

[...names].forEach((name) => {
  let title, initial, first_name, last_name;

  function allocatePersonAttributes(name) {
    title = name.match(/^(?<!.)(dr)|(mr[s]?)|(miss)\.?/gi);
    //only searching for singles for now.
    initial = name.match(/(?<= )\w?(?=\. )/gi);
    //just doing a loose search; tighten up later.
    first_name = name.match(/(?<= +?)(?!(and(?!\w+?)|&)|(dr)|(mr[s]?)|(miss))(\w(?!\.)){2,}(?= )/gi);
    //making sure that surnames are at least 2 characters.
    last_name = name.match(/(?<= +?)\w+?$/gi);
    //making an assumption that the surname will absolutely be last in the string; this may be dangerous in larger datasets and/or where there is an unregulated input (i.e., genuine user values), but suffices within the scope of this challenge. same assumption applies to the titles (in that they will always be at the start).

    return people.push(new Person(title, initial, first_name, last_name));
  }

  const assignCouple = () => {
    const titles = name.match(/(dr|mr[s]?|miss)+?/gi);
    let separatedCouples = [];

    titles.forEach((title) => {
      const titleReg = new RegExp("^" + title + "$", "i");
      const splitName = name.split(" ");
      let person = splitName.filter((y) => !y.match(titleReg));
      person = person.filter((y) => !y.match(/and(?!\w+?)|&/));
      person = person.join(" ");
      if (!title.match(/mrs|miss/gi)) {
        person = person.replace(/(?<= +?)(?!(and(?!\w+?)|&)|(dr)|(mr[s]?)|(miss))(\w(?!\.)){2,}(?= \w+?)/gi, "");
      }
      separatedCouples.push(person);
    });

    separatedCouples.forEach((partner) => allocatePersonAttributes(partner));
  };

  const assignSingle = () => {
    allocatePersonAttributes(name);
  };

  name.match(/and(?!\w+?)|&/gi) ? assignCouple() : assignSingle();
});

console.log(people);