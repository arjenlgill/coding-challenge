const names = [
  "Mr. A. John Smith",
  "Mr. G. Jones",
  "mr & mrs smith",
  "Dr and Mrs James Spade",
  "Miss Allen",
  "MR ANDY PRINGLE",
];

let people = [];

class Person{
    constructor(title, initial, first_name, last_name){

        this.title = title ? title.toString() : null,
        this.initial = initial ? initial.toString() : null,
        this.first_name = first_name ? first_name.toString() : null,
        this.last_name = last_name ? last_name.toString() : null // try to avoid repetition of ternary
    }
}

[...names].forEach((name) => {
    
    let title = name.match(/^(?<!.)(dr)|(mr[s]?)|(miss)\.?/ig);
     //only searching for singles for now.
    let initial = name.match(/(?<= )\w\.?(?= )/ig);
    //just doing a loose search; tighten up later.
    let first_name = name.match(/(?<= +?)(?!(and(?!\w)|&)|(dr)|(mr[s]?)|(miss))(\w(?!\.)){2,}(?= )/ig);
    //making sure that surnames are at least 2 characters.
    let last_name = name.match(/(?<= +?)\w+?$/ig);
    //making an assumption that the surname will absolutely be last in the string; this may be dangerous in larger datasets and/or where there is an unregulated input (i.e., genuine user values), but suffices within the scope of this challenge. same assumption applies to the titles (in that they will always be at the start).

    console.log(new Person(title, initial, first_name, last_name));

})