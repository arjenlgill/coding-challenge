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

//for each name item, we need to retrieve the attributes of title, initial, first name, and last name.
//to do so, the below code evaluates whether the name contains one person, or a couple, and then returns
//individualised data to pass into our Person class (or prototype).

[...names].forEach((name) => {
  let title, initial, first_name, last_name;

  const allocatePersonAttributes = (name) => {
    title = name.match(titleReg);
    initial = name.match(initialReg);
    //making sure that surnames are at least 2 characters, to prevent conflict with initials.
    first_name = name.match(firstNameReg);  
    //making an assumption that the surname will absolutely be last in the string; this may be dangerous 
    //in larger datasets and/or where there is an unregulated input (i.e., genuine user values), but suffices 
    //within the scope of this challenge.
    last_name = name.match(lastNameReg); 

    return people.push(new Person(title, initial, first_name, last_name));
  }

  //if it's a couple, then we need to use regex to split the two, whilst still retaining some shared attributes 
  //such as last name.
  const assignCouple = () => {
    const titles = name.match(titleReg);
    let separatedCouples = [];
    
    //the below code iterates over the titles within the name (e.g., 'dr' and 'mrs'), and uses them to create two 
    //separate child arrays containing the relevant attributes from the parent name.
    titles.forEach((title) => {
       //titlesReg is needed here instead of titleReg because we need an exact match, and in 'mr & mrs' cases, the 
      //titleReg will match both and defeat the purpose of separation.
      const titlesReg = new RegExp("^" + title + "$", "i");
      const splitName = name.split(" ");
      let person = splitName.filter((y) => !y.match(titlesReg));
      person = person.filter((y) => !y.match(coupleReg));
      person = person.join(" ");
      //following convention of not using the first name for the wife.
      title.match(/mrs|miss/gi) ? null : (person = person.replace(firstNameReg, "")); 
      
      separatedCouples.push(person);
    });

    separatedCouples.forEach((partner) => allocatePersonAttributes(partner));
  };
  
  //if it's a single person, then we can simply pass on the attributes using our regex variables from lines 25-29.
  const assignSingle = () => {
    allocatePersonAttributes(name);
  };

  //evaluates whether the name indicates a single person or couple by testing against coupleReg.
  name.match(coupleReg) ? assignCouple() : assignSingle();
});

console.log(people);
