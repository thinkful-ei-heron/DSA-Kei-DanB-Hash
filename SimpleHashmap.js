class SimpleHashmap {
  constructor(initialCapacity=11){
    this.length = 0;
    this.hashTable = [];
    this.capacity = initialCapacity;
    this.deleted = 0;
  }

  hashString(num){
    console.log(num % this.capacity);
    return num % this.capacity;
  }
  get(key){
    const index = this.findSlot(key);
    if (this.hashTable[index] === undefined){
      throw new Error('Key error');
    }
    return this.hashTable[index].value;
  }

  set(key, value){
    const loadRatio = (this.length + this.deleted + 1) / this.capacity;
    if (loadRatio > SimpleHashmap.MAX_LOAD_RATIO){
      this.resize(this.capacity * SimpleHashmap.SIZE_RATIO);
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
    const hash = this.hashString(key);
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

SimpleHashmap.MAX_LOAD_RATIO = 1;
SimpleHashmap.SIZE_RATIO = 3;
module.exports = SimpleHashmap;