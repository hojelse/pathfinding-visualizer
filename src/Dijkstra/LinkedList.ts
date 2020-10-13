
export class LinkedList<T> {
  head: LinkedListNode<T> | null;

  constructor() {
    this.head = null;
  }

  add(n: T) {
    if (this.head == null) {
      this.head = new LinkedListNode<T>(n);
    } else {
      this.head = new LinkedListNode<T>(n, this.head);
    }
  }

  [Symbol.iterator](): LinkedListIterator<T> {
    return new LinkedListIterator<T>(this);
  }
}

class LinkedListNode<T> {
  data: T;
  next: LinkedListNode<T> | null;
  constructor(data: T, next: LinkedListNode<T> | null = null) {
    this.data = data,
      this.next = next
  }
}

class LinkedListIterator<T> implements Iterator<T> {
  nextNode: LinkedListNode<T>;
  linkedList: LinkedList<T>;

  constructor(linkedList: LinkedList<T>) {
    this.linkedList = linkedList;
    this.nextNode = linkedList.head;
  }

  next(): IteratorResult<T> { //TODO refactor
    let currentNode: LinkedListNode<T> = this.nextNode;
    if (currentNode == null) return {
      done: true,
      value: 0
    }
    this.nextNode = currentNode.next;
    return {
      done: currentNode == null,
      value: currentNode.data,
    }
  }
}