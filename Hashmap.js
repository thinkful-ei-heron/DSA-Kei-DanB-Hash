class Hashmap {
  constructor(initialCapacity=8){
    this.length = 0;
    this.hashTable = [];
    this.capacity = initialCapacity;
    this.deleted = 0;
  }

  static hashString(string){
    let hash = 5381;
    for (let i = 0; i < string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
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
    if (loadRatio > Hashmap.MAX_LOAD_RATIO){
      this.resize(this.capacity * Hashmap.SIZE_RATIO);
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
    const hash = Hashmap.hashString(key);
    //slot in hash to hashtable (index)
    const start = hash % this.capacity;
    for (let i = start; i < start + this.capacity; i++){
      const index = i  % this.capacity;
      const slot = this.hashTable[index];
      //check slot, if open return that index
      if (slot === undefined || (slot.key === key && !slot.DELETED)){
        console.log(index);
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

Hashmap.MAX_LOAD_RATIO = .5;
Hashmap.SIZE_RATIO = 3;
module.exports = Hashmap;