const names = [
  "Mr. John Smith",
  "Mr. G. Jones",
  "mr & mrs smith",
  "Dr and Mrs James Spade",
  "Miss Allen",
  "MR ANDY PRINGLE",
];

let people = [];

class Person{
    constructor(title, initial, first_name, last_name){
        this.title = title,
        this.initial = initial,
        this.first_name = first_name,
        this.last_name = last_name,
    }
}

[...names].forEach((name) => {
    
    let title = name.filter(filter => filter.match(/mr[\.]?/ig)

})