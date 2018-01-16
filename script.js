//Zadanie 1
const joinString = (first, second) => console.log(`Pierwszy arg to ${first} a drugit to ${second}. Razem dają ${first} ${second}`);

//Zadanie 2
const multiply = (a=2, b=2) => console.log( a + b);

//Zadanie 3
const average = (...args) => {
    var sum = 0;
    args.forEach(element => sum += element);
    console.log(sum / args.length);
};

//Zadanie 4
const grades = [1, 5, 5, 5, 4, 3, 3, 2, 1];
const showMe = () => console.log(average(...grades));

//Zadanie 5
const strenght = [1, 4, 'Iwona', false, 'Nowak'];
const [,,fisrtName,,lastName] = strenght;
const firstLastName = () => console.log(`${fisrtName} ${lastName}`);
