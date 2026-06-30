/**
 * Iterator Pattern
 *
 * Extracts traversal behavior from a collection into a separate iterator object
 * that exposes a uniform hasNext()/next() interface regardless of the underlying
 * data structure. The problem: embedding traversal logic in the collection
 * couples clients to its internal representation — switching from an array to a
 * linked list breaks all traversal code. Each iterator tracks its own position,
 * so multiple iterators can walk the same collection simultaneously and
 * independently, and client code stays identical across different collection types.
 *
 * Use when: collection internals should be hidden from clients; you need multiple
 * independent traversal cursors on the same collection; or client code must work
 * uniformly across different collection types without knowing their structure.
 */

/**
 * --------- NON COMPLIANT CODE ---------
 * NumberList exposes its raw array directly. The client is forced to know the
 * internal structure (array indexing, .length) to traverse it. If the backing
 * structure ever changes to a linked list or tree, all client traversal code
 * breaks. Two traversal cursors at different positions are also impossible
 * without the client managing external index variables manually.
 */
class NumberListDirect {
  items: number[] = [10, 20, 30, 40];
}

const directList = new NumberListDirect();
for (let i = 0; i < directList.items.length; i++) {
  console.log(directList.items[i]); // 10, 20, 30, 40
}

/**
 * --------- COMPLIANT CODE ------------
 * A shared Iterator<T> interface decouples traversal from storage. Each concrete
 * collection produces its own iterator that tracks position internally — the
 * client only calls hasNext()/next() and never touches the backing structure.
 * The same printAll() function works unchanged for both an array-backed list and
 * a linked list, and two iterators on the same collection advance independently.
 */
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

interface Collection<T> {
  createIterator(): Iterator<T>;
}

// --- Array-backed collection ---

class ArrayIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(private items: T[]) {}

  hasNext(): boolean {
    return this.index < this.items.length;
  }

  next(): T {
    return this.items[this.index++];
  }
}

class NumberList implements Collection<number> {
  private items: number[] = [10, 20, 30, 40];

  createIterator(): Iterator<number> {
    return new ArrayIterator(this.items);
  }
}

// --- Linked-list-backed collection ---

class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null,
  ) {}
}

class LinkedListIterator<T> implements Iterator<T> {
  private current: ListNode<T> | null;

  constructor(head: ListNode<T> | null) {
    this.current = head;
  }

  hasNext(): boolean {
    return this.current !== null;
  }

  next(): T {
    const value = this.current!.value;
    this.current = this.current!.next;
    return value;
  }
}

class NumberLinkedList implements Collection<number> {
  private head: ListNode<number> | null = null;

  add(value: number): void {
    this.head = new ListNode(value, this.head);
  }

  createIterator(): Iterator<number> {
    return new LinkedListIterator(this.head);
  }
}

/* --------- Client Code --------- */

// same traversal logic works for any Collection<number> — no knowledge of internals
function printAll(collection: Collection<number>): void {
  const iter = collection.createIterator();
  while (iter.hasNext()) {
    console.log(iter.next());
  }
}

const arrayList = new NumberList();
printAll(arrayList); // 10, 20, 30, 40

const linkedList = new NumberLinkedList();
linkedList.add(10);
linkedList.add(20);
linkedList.add(30);
printAll(linkedList); // 30, 20, 10 (LIFO insertion order)

// two independent iterators on the same collection — each tracks its own position
const list = new NumberList();
const iter1 = list.createIterator();
const iter2 = list.createIterator();

console.log(iter1.next()); // 10
console.log(iter1.next()); // 20  ← iter1 advanced to position 2
console.log(iter2.next()); // 10  ← iter2 unaffected, still at position 0
