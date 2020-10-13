
export class MinPQ {
  maxN: number;
  n: number;
  pq: number[];
  qp: number[];
  keys: number[];

  constructor(maxN: number = 1) {
    if (maxN < 0) throw new Error("IllegalArgumentException: maxN too small");
    this.maxN = maxN;
    this.n = 0;
    this.keys = new Array<number>(maxN + 1);
    this.pq = new Array<number>(maxN + 1);
    this.qp = new Array<number>(maxN + 1);
    for (let i = 0; i <= maxN; i++) this.qp[i] = -1;
  }

  isEmpty(): boolean {
    return this.n == 0;
  }

  contains(i: number): boolean {
    this.validateIndex(i);
    return this.qp[i] != -1;
  }

  size() {
    return this.n;
  }

  insert(i: number, key: number) {
    this.validateIndex(i);
    if (this.contains(i)) throw new Error("IllegalArgumentException: index is already in the priority queue");
    this.n++;
    this.qp[i] = this.n;
    this.pq[this.n] = i;
    this.keys[i] = key;
    this.swim(this.n);
  }

  minIndex(): number {
    if (this.n == 0) throw new Error("NoSuchElementException: Priority queue underflow");
    return this.pq[1];
  }

  minKey(): number {
    if (this.n == 0) throw new Error("NoSuchElementException: Priority queue underflow");
    return this.keys[this.pq[1]];
  }

  popMin(): number {
    if (this.n == 0) throw new Error("NoSuchElementException: Priority queue underflow");
    let min: number = this.pq[1];
    this.swap(1, this.n--);
    this.sink(1);
    this.qp[min] = -1; // delete
    this.keys[min] = null;
    this.pq[this.n + 1] = -1;
    return min;
  }

  keyOf(i: number): number {
    this.validateIndex(i);
    if (!this.contains(i)) throw new Error("NoSuchElementException: index is not in the priority queue");
    else return this.keys[i];
  }

  changeKey(i: number, key: number) {
    this.validateIndex(i);
    if (!this.contains(i)) throw new Error("NoSuchElementException: index is not in the priority queue");
    this.keys[i] = key;
    this.swim(this.qp[i]);
    this.sink(this.qp[i]);
  }

  decreaseKey(i: number, key: number) {
    this.validateIndex(i);
    if (!this.contains(i)) throw new Error("NoSuchElementException: index is not in the priority queue");
    if (this.keys[i] == key) throw new Error("IllegalArgumentException: Calling decreaseKey() with a key equal to the key in the priority queue");
    if (this.keys[i] < key) throw new Error("IllegalArgumentException: Calling decreaseKey() with a key strictly greater than the key in the priority queue");
    this.keys[i] = key;
    this.swim(this.qp[i]);
  }

  increaseKey(i: number, key: number) {
    this.validateIndex(i);
    if (!this.contains(i)) throw new Error("NoSuchElementException: index is not in the priority queue");
    if (this.keys[i] == key) throw new Error("IllegalArgumentException: Calling decreaseKey() with a key equal to the key in the priority queue");
    if (this.keys[i] > key) throw new Error("IllegalArgumentException: Calling increaseKey() with a key strictly less than the key in the priority queue");
    this.keys[i] = key;
    this.sink(this.qp[i]);
  }

  delete(i: number) {
    this.validateIndex(i);
    if (!this.contains(i)) throw new Error("NoSuchElementException: index is not in the priority queue");
    let index: number = this.qp[i];
    this.swap(index, this.n--);
    this.swim(index);
    this.sink(index);
    this.keys[i] = null;
    this.qp[i] = -1;
  }

  validateIndex(i: number) {
    if (i < 0) throw new Error("IllegalArgumentException: index is negative: " + i);
    if (i >= this.maxN) throw new Error("IllegalArgumentException: index >= capacity: " + i);
  }

  // General helpers
  firstGreaterThanSecond(i: number, j: number): boolean {
    return this.keys[this.pq[i]] > this.keys[this.pq[j]];
  }

  swap(a: number, b: number) {
    [this.pq[a], this.pq[b]] = [this.pq[b], this.pq[a]] // one-line swap with destructuring
  }

  // Heap helpers

  swim(k: number) {
    while (k > 1 && this.firstGreaterThanSecond(this.asInt(k / 2), k)) {
      this.swap(k, this.asInt(k / 2));
      k = this.asInt(k / 2);
    }
  }

  sink(k: number) {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.firstGreaterThanSecond(j, j + 1)) j++;
      if (!this.firstGreaterThanSecond(k, j)) break;
      this.swap(k, j);
      k = j;
    }
  }

  // Utilities

  asInt(x: number): number {
    return Math.floor(x);
  }

}