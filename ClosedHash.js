class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  //methods: insertFirst(value), insertLast(value), insert(node1, node2), find(value)
  insertFirst(value) {
    this.head = new Node(value, this.head);
  }
  insertLast(value) {
    if (this.head === null) {
      this.insertFirst(value);
    } else {
      let last = this.head;
      while (last.next !== null) {
        last = last.next;
      }
      last.next = new Node(value, null);
    }
  }
  insertAfter(value, insertion) {
    let currNode = this.find(insertion);
    let afterNode = currNode.next;
    currNode.next = new Node(value, afterNode);
  }
  insertBefore(value, insertion) {
    let currNode = this.head;
    let tempNode = this.head;
    while (currNode.value !== insertion) {
      tempNode = currNode;
      currNode = currNode.next;
    }
    tempNode.next = new Node(value, currNode);
  }
  insertAt(value, index) {
    let currIndex = 0;
    let currNode = this.head;
    while (currIndex !== (index - 1)) {
      currNode = currNode.next;
      currIndex++;
    }
    currNode.next = new Node(value, currNode.next.next);
  }
  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;
    while ((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
  display() {
    let currNode = this.head;
    let str = '';
    while (currNode.next !== null) {
      str = str + currNode.value + ', ';
      currNode = currNode.next;
    }
    str = str + currNode.value;
    console.log(str);
  }
  size() {
    let size = 0;
    let currNode = this.head;
    while (currNode !== null) {
      size++;
      currNode = currNode.next;
    }
    return size;
  }
  isEmpty() {
    return this.head === null;
  }
  findPrevious(value) {
    let currNode = this.head;
    if (currNode === null) {
      return 'empty list';
    } else {
      let tempNode = currNode;
      while (currNode.value !== value) {
        if (currNode.next === null) {
          return 'no such value';
        } else {
          tempNode = currNode;
          currNode = currNode.next;
        }
      }
      return tempNode;
    }
  }
  findLast() {
    let currNode = this.head;
    if (currNode === null) {
      return 'empty list';
    } else {
      while (currNode.next !== null) {
        // if (currNode.next !== null){
        //   currNode = currNode.next;
        // }
        currNode = currNode.next;
      }
      return currNode;
    }
  }
  reverse(node) {
    // let tempHead = node;
    if (node.next !== null) {
      // console.log('before reverse', node.next.value);
      this.reverse(node.next);
      node.next.next = node;
      // console.log(`set node ${node.value}.next.next to ${node.value}`);
      // console.log(`${node.next.value}.next is now ${node.next.next.value}`);
      // console.log(`${node.value}.next is ${node.next.value}`);
      node.next = null;
      // console.log(`${node.value}.next is ${node.next}`)
      //this else block is the base case
    } else {
      // console.log('node', node.value, 'next is null');
      // console.log(`head is ${tempHead.value}, line 47`);
      // this.head = tempHead;
      this.head = node;
    }
  }
  itReverse() {
    if (this.head === null) {
      return 'empty list';
    } else {
      let currNode = this.head;
      let nextNode = this.head.next;
      let nextNextNode = null;
      //a points to null
      console.log(`currNode: ${currNode.value}, nextNode: ${nextNode.value}`);
      currNode.next = null;
      console.log(`set tail next to ${currNode.next}`);
      console.log('\b');
      while (nextNode !== null) {
        //store c
        console.log(`while nextNode has a value, nextNode: ${nextNode.value}`);
        console.log(`currNode: ${currNode.value}, nextNode: ${nextNode.value}`);
        nextNextNode = nextNode.next;
        if (nextNextNode === null) {
          console.log(`stored nextNextNode variable: ${nextNextNode}`);
        } else {
          console.log(`stored nextNextNode variable: ${nextNextNode.value}`);
        }
        //b points to a
        console.log('broke nextNode connection and set it back');
        nextNode.next = currNode;
        console.log(`${nextNode.value} points to ${nextNode.next.value}`);
        console.log('store currNode as nextNode (moving over one)');
        currNode = nextNode;
        console.log(`currNode = ${currNode.value}`);
        console.log('move nextNode over one node');
        nextNode = nextNextNode;
        if (nextNode !== null) {
          console.log(`nextNode = ${nextNode.value}`);
        } else {
          console.log(`nextNode = ${nextNode}`);
        }
        if (nextNode === null){
          console.log('nextNode is null, we have hit the tail, set the tail to be the head');
          this.head = currNode;
        }
        console.log('\b');
      }
    }
  }

  /*
  a > b > c > null 
  reverse(a) [swap a and b]
    reverse(b) [swap b and c]
      reverse(c) [swap c and null] > hits the base case-- set the head of the list to c, our last node
    [complete reverse(b): b.next.next (this is c.next) = b]

                                    ----
                                   v   |
    [at this state our list is a > b > c]
    [node.next = null]
                                    ----
                                   v   |
    [at this state our list is a > b   c]
                                   |
                                   v
                                  null

  [complete reverse(a): a.next.next (this is b.next) = a]
                                 c
                                 v
  [at this state our list is a > b > a]

  [node.next = null]
                                 c
                                 v
  [at this state our list is     b > a]
                                     |
                                     v
                                    null

  */

  thirdFromEnd() {
    let currNode = this.head;


    while (currNode.next.next.next !== null) {
      currNode = currNode.next;
    }
    return currNode;
  }

  middleOfList() {
    let currNode = this.head;
    let indx1 = 0;
    let indx2 = this.size();

    if (indx2 % 2 === 0) {
      indx2 = indx2 / 2 - 1;
    }
    else {
      indx2 = Math.floor(indx2 / 2);
    }
    while (indx1 < indx2) {
      currNode = currNode.next;
      indx1++;
    }
    return currNode.value;
  }

  cycle(node) {
    if (this.head === null) {
      this.insertFirst(node.value);
    } else {
      let last = this.head;
      while (last.next !== null) {
        last = last.next;
      }
      last.next = node;
    }
  }

  //will return true if the list is a cycle. Will return false if not a cycle.
  cycleList(){
    let newObject = {};
    let currHead = this.head;
    while(currHead.next !== null){
      if(newObject[currHead.value]){
        return true;
      }
      newObject[currHead.value] = currHead.value;
      currHead = currHead.next;
    }
    return false;
  }

}

class Closedhash {
  constructor(initialCapacity=8){
    this.length = 0;
    this.hashTable = [];
    this.capacity = initialCapacity;
    this.deleted = 0;
  }

  hashString(string){
    let hash = 5381;
    for (let i = 0; i < string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
  get(key){
    const index = this.hashString(key) % this.capacity;
    let currNode = this.hashTable[index];
    while (currNode.value.key !== key){
      currNode = currNode.next;
    }
    return currNode.value.value;
  }

  set(key, value){
    let obj = {
      key,
      value
    };
    const loadRatio = (this.length + this.deleted + 1) / this.capacity;
    if (loadRatio > Closedhash.MAX_LOAD_RATIO){
      this.resize(this.capacity * Closedhash.SIZE_RATIO);
    }
    const index = this.hashString(key) % this.capacity;
    if (this.hashTable[index] === undefined){
      let node = new Node(obj, null);
      this.hashTable[index] = node;
      this.length++;
    } else {
      let currNode = this.hashTable[index];
      if (currNode.value.key === key){
        currNode.value.value = value;
      } else {
        while (currNode.next !== null){
          currNode = currNode.next;
        }
        currNode.next = new Node(value, null);  
        this.length++;
      }
    }

  }
  
  findSlot(key) {
  }

  resize(size) {

  }

  delete(key){
  }
}

Closedhash.MAX_LOAD_RATIO = .5;
Closedhash.SIZE_RATIO = 3;
module.exports = Closedhash;