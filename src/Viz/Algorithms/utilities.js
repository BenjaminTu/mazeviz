// node types
export const Type = {
  Empty: "",
  Wall: "wall",
  Start: "start",
  Goal: "goal",
  Visited: "visited",
  Path: "path",
};

// grid directions
export const directions = [
  [0, -1], // left
  [1, 0], // down
  [0, 1], // right
  [-1, 0], // up
  // diagonal
  // [1, 1],
  // [1, -1],
  // [-1, -1],
  // [-1, 1]
];

// shuffle an array (for randomizing directions)
export function shuffle(array) {
  let rand, temp, cur;
  for (cur = array.length - 1; cur > 0; cur--) {
    rand = Math.floor(Math.random() * (cur + 1));
    temp = array[cur];
    array[cur] = array[rand];
    array[rand] = temp;
  }
}

// get neighbors given cell (ignores wall)
export function getNeighbors(grid, node) {
  if (!grid.length) {
    return [];
  }

  const rows = grid.length;
  const cols = grid[0].length;

  let neighbors = [];
  for (let i = 0; i < directions.length; i++) {
    let dir = directions[i];
    let newRow = node.row + dir[0];
    let newCol = node.col + dir[1];
    if (
      newRow >= 0 &&
      newCol >= 0 &&
      newRow < rows &&
      newCol < cols &&
      grid[newRow][newCol].nodeType !== Type.Wall
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
}

// A custom min/max heap (given comparator)
export class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this.heap = [];
    this._comparator = comparator;
  }

  // cannot add null to heap
  add(item) {
    if (item === null) {
      throw new Error("Item cannot be null!");
    }

    // add to the end and heapify
    this.heap.push(item);
    this._swimUp(this.size() - 1);
    return true;
  }

  // clear all items in heap
  clear() {
    this.heap = [];
  }

  // return null if heap is empty
  peek() {
    return this.size() === 0 ? null : this.heap[0];
  }

  // update item if item is modified (do nothing if not found)
  updateItem(item) {
    for (let i = 0; i < this.size(); i++) {
      if (this.heap[i] === item) {
        this._sinkDown(i);
        this._swimUp(i);
      }
    }
  }

  // remove and return the min/max of the heap (return null if empty)
  poll() {
    if (this.size() === 0) {
      return null;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }

    // swap the last node and root then heapify
    let item = this.heap[0];
    this.heap[0] = this.heap.pop();

    this._sinkDown(0);
    return item;
  }

  // return size of heap
  size() {
    return this.heap.length;
  }

  // true/false if heap is empty
  isEmpty() {
    return this.size() === 0;
  }

  // heapify a node with given index downwards
  _sinkDown(index) {
    let idx = index;
    while (idx < this.size()) {
      // both children
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let swap = idx;

      // Sink down if parent is greater than children
      if (
        left < this.size() &&
        this._comparator(this.heap[idx], this.heap[left]) > 0
      ) {
        swap = left;
      } else if (
        right < this.size() &&
        this._comparator(this.heap[idx], this.heap[right]) > 0
      ) {
        swap = right;
      } else {
        return;
      }

      // swap
      let temp = this.heap[idx];
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = temp;

      idx = swap;
    }
  }

  // heapify a node with given index upwards
  _swimUp(index) {
    let idx = index;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      // Swim up if parent is greater than children
      if (this._comparator(this.heap[parent], this.heap[idx]) > 0) {
        // swap
        let temp = this.heap[parent];
        this.heap[parent] = this.heap[idx];
        this.heap[idx] = temp;

        idx = parent;
      } else {
        return;
      }
    }
  }
}
