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
    const convertToString = (attribute) => {
      return attribute ? attribute.toString().toUpperCase() : null;
    }

    (this.title = convertToString(title)),
      (this.initial = convertToString(initial)),
      (this.first_name = convertToString(first_name)),
      (this.last_name = convertToString(last_name));
  }
}

const coupleReg = /and(?!\w+?)|&/gi;
const titleReg = /(dr|mr[s]?|miss)+?/gi;
const initialReg = /(?<= )\w?(?=\. )/gi;
const firstNameReg = /(?<= +?)(?!(and(?!\w+?)|&)|(dr)|(mr[s]?)|(miss))(\w(?!\.)){2,}(?= )/gi;
const lastNameReg = /(?<= +?)\w+?$/gi;

[...names].forEach((name) => {
  let title, initial, first_name, last_name;

  const allocatePersonAttributes = (name) => {
    title = name.match(titleReg);
    initial = name.match(initialReg);
    first_name = name.match(firstNameReg);  //making sure that surnames are at least 2 characters, to prevent conflict with initials.
    last_name = name.match(lastNameReg); //making an assumption that the surname will absolutely be last in the string; this may be dangerous in larger datasets and/or where there is an unregulated input (i.e., genuine user values), but suffices within the scope of this challenge.

    return people.push(new Person(title, initial, first_name, last_name));
  }

  const assignCouple = () => {
    const titles = name.match(titleReg);
    let separatedCouples = [];

    titles.forEach((title) => {
      const titlesReg = new RegExp("^" + title + "$", "i"); //this is needed here instead of titleReg because we need an exact match, and in 'mr & mrs' cases, the titleReg will match both and defeat the purpose of separation.
      const splitName = name.split(" ");
      let person = splitName.filter((y) => !y.match(titlesReg));
      person = person.filter((y) => !y.match(coupleReg));
      person = person.join(" ");
      title.match(/mrs|miss/gi) ? null : (person = person.replace(firstNameReg, ""));
      
      separatedCouples.push(person);
    });

    separatedCouples.forEach((partner) => allocatePersonAttributes(partner));
  };

  const assignSingle = () => {
    allocatePersonAttributes(name);
  };

  name.match(coupleReg) ? assignCouple() : assignSingle();
});

console.log(people);
