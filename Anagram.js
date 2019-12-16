class Anagram {
  constructor(initialCapacity=8){
    this.length = 0;
    this.hashTable = [];
    this.capacity = initialCapacity;
    this.deleted = 0;
  }

  hashString(string){
    let total = 0;
    for (let i = 0; i < string.length; i++) {
      total += string.charCodeAt(i);
    }
    return total % this.capacity;
  }
  get(key){
    const index = this.findSlot(key);
    if (this.hashTable[index] === undefined){
      return undefined;
      //throw new Error('Key error');
    }
    return this.hashTable[index].value;
  }

  set(key, value){
    const loadRatio = (this.length + this.deleted + 1) / this.capacity;
    if (loadRatio > Anagram.MAX_LOAD_RATIO){
      this.resize(this.capacity * Anagram.SIZE_RATIO);
    }
    const index = this.findSlot(key);
    if (!this.hashTable[index]){
      this.length++;
    }
    this.hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }
  
  findSlot(key) {
    const hash = (key);
    //slot in hash to hashtable (index)
    const start = hash % this.capacity;
    for (let i = start; i < start + this.capacity; i++){
      const index = i  % this.capacity;
      const slot = this.hashTable[index];
      //check slot, if open return that index
      if (slot === undefined || (slot.key === key && !slot.DELETED)){
        return index;
      }
    }
  }

  resize(size) {
    const oldSlots = this.hashTable;
    this.capacity = size;
    this.length = 0;
    this.hashTable = [];
    for (const slot of oldSlots){
      if (slot !== undefined){
        this.set(slot.key, slot.value);
      }
    }
  }

  delete(key){
    const index = this.findSlot(key);
    const slot = this.hashTable[index];
    if (slot === undefined){
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this.deleted++;
  }
}

Anagram.MAX_LOAD_RATIO = .5;
Anagram.SIZE_RATIO = 3;
module.exports = Anagram;