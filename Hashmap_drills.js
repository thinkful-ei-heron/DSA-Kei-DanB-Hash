const Hashmap = require('./Hashmap');
const SimpleHashmap = require('./SimpleHashmap');
const Anagram = require('./Anagram');
const Closedhash = require('./ClosedHash');

function main() {
  // let lotr = new Hashmap();
  // lotr.MAX_LOAD_RATIO = .5;
  // lotr.SIZE_RATIO = 3;
  // lotr.set('Hobbit', 'Bilbo');
  // lotr.set('Hobbit', 'Frodo');
  // lotr.set('Wizard', 'Gandalf');
  // lotr.set('Human', 'Aragorn');
  // lotr.set('Elf', 'Legolas');
  // lotr.set('Maiar', 'The Necromancer');
  // lotr.set('Maiar', 'Sauron');
  // lotr.set('RingBearer', 'Gollum');
  // lotr.set('LadyOfLight', 'Galadriel');
  // lotr.set('HalfElven', 'Arwen');
  // lotr.set('Ent', 'Treebear');
  // console.log(lotr);
  // console.log(lotr.get('Hobbit'));
  // console.log(lotr.get('Maiar'));
  // 1. Maiar = Sauron, Hobbit = Frodo. There is no discrepancy,
  // the keys of Maiar and Hobbit were overwritten from their initial
  // values by later set calls. 
  // The capacity of the hashmap is 24. Default capacity is 8. Max load ratio is 0.5, which we 
  // hit after the 5th insertion (5/8), capacity was tripled due to the size ratio being x3.

  // 2. Output will be 20, then 10. Calling set('Hello World.', value) will set the value of that key,
  // or if it already exists, overwrite it. It was first set to 10, then 20 in map1. In map2, it was set 
  // to 20, then 10.

  // 3. 10 goes to index 10. 22 goes to 0. 31 goes to 9. 4 goes to 4. 15 goes to 4, collides, goes up one
  // to 5. 28 goes to 6. 17 goes to 6, collides, goes to 7. 88 goes to 0, collies, goes up one to 1. 59 goes to 4,
  // collides, goes to 5, then 6, then 7, then 8, which is the next open slot. See below for a hack-y code proof.
  // let simple = new SimpleHashmap();
  // simple.set(10, 10);
  // simple.set(22, 22);
  // simple.set(31, 31);
  // simple.set(4, 4);
  // simple.set(15, 15);
  // simple.set(28, 28);
  // simple.set(17, 17);
  // simple.set(88, 88);
  // simple.set(59, 59);
  // console.log(simple.hashTable[0]);
  // console.log(simple.hashTable[1]);
  // console.log(simple.hashTable[2]);
  // console.log(simple.hashTable[3]);
  // console.log(simple.hashTable[4]);
  // console.log(simple.hashTable[5]);
  // console.log(simple.hashTable[6]);
  // console.log(simple.hashTable[7]);
  // console.log(simple.hashTable[8]);
  // console.log(simple.hashTable[9]);
  // console.log(simple.hashTable[10]);

  // 4. 
  // console.log(removeDuplicates('google all that you think can think of'));

  // 5.
  // console.log(checkPalindrome('acecarr'));
  // console.log(checkPalindrome('north'));

  // review
  // console.log(checkMovies(260, [100, 120, 140, 160]));
  // console.log(checkMovies(300, [100, 120, 140, 160]));

  //6. 
  // console.log(checkAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

  //7. 
  let closed = new Closedhash();
  closed.set('Hobbit', 'Bilbo');
  closed.set('Hobbit', 'Frodo');
  closed.set('Wizard', 'Gandalf');
  closed.set('Human', 'Aragorn');
  closed.set('Elf', 'Legolas');
  closed.set('Maiar', 'The Necromancer');
  closed.set('Maiar', 'Sauron');
  closed.set('RingBearer', 'Gollum');
  closed.set('LadyOfLight', 'Galadriel');
  closed.set('HalfElven', 'Arwen');
  closed.set('Ent', 'Treebeard');
  console.log(closed);
  console.log(closed.get('Hobbit'));
  console.log(closed.get('Maiar'));

}

function removeDuplicates(string){
  let newStr = string[0];
  let stringHashmap = new Hashmap();
  stringHashmap.set(string[0], string[0]);
  for (let i = 1; i < string.length; i++){
    if (stringHashmap.get(string[i])===undefined){
      stringHashmap.set(string[i], string[i]);
      newStr = newStr + string[i];
    }
  }
  return newStr;
}

function checkPalindrome(string){
  let stringHashmap = new Hashmap();
  stringHashmap.set(string[0], string[0]);
  for (let i = 1; i < string.length; i++){
    if (stringHashmap.get(string[i])===undefined){
      stringHashmap.set(string[i], string[i]);
    }
  }
  return Boolean(Math.ceil(stringHashmap.length === Math.ceil(string.length / 2)));
}

function checkMovies(flightLength, movieLengths){
  let sumHash = new Hashmap();
  for (let i = 0; i < movieLengths.length; i++){
    sumHash.set(movieLengths[i], movieLengths[i]);
  }
  for (let i  = 0; i < movieLengths.length; i++){
    if (flightLength-movieLengths[i] !== undefined){
      return true;
    }
  }
  return false;
}

function checkAnagrams(wordArray){
  let finalArray = [];
  let hashArray = [];
  let finalArrayCount = 0;
  //create a hashmap of hash values for every word
  for (let i = 0; i < wordArray.length; i++){
    let word = wordArray[i];
    let obj = {
      hash: hashString(word),
      value: word
    };
    hashArray.push(obj);
  }
  //if word's hash value exists, push it to an array
  for (let i = 0; i < wordArray.length; i++){
    let word = wordArray[i];
    let hash = hashString(word);
    let anagramObjArray = (hashArray.filter(obj => obj.hash === hash));
    let anagramArray = [];
    anagramObjArray.forEach(e => anagramArray.push(e.value));
    finalArray.push(anagramArray);
    finalArrayCount = finalArrayCount + anagramArray.length;
    if (finalArrayCount === wordArray.length){
      return finalArray;
    }
  }
  return finalArray;
}

function hashString(string){
  let total = 0;
  for (let i = 0; i < string.length; i++) {
    total += string.charCodeAt(i);
  }
  return total;
}

main();