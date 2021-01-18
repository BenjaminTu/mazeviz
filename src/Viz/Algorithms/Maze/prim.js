import { shuffle, directionsNoDiag, Type } from "../utilities";

// maze generator with prim's algorithm
export function prim(grid, start) {
  let arr = [];
  let pathNodesInOrder = [];

  let startingNeighbors = getNeighborNodes(grid, start);
  arr.push(...startingNeighbors);
  start.visited = true;

  while (!!arr.length) {
    // swap random index with last element of array
    let randomIndex = Math.floor(Math.random() * arr.length);
    let temp = arr[arr.length - 1];
    arr[arr.length - 1] = arr[randomIndex];
    arr[randomIndex] = temp;

    let node = arr.pop();

    // skip processed nodes
    if (node.visited) {
      continue;
    }

    node.visited = true;

    let neighbors = getNeighborNodes(grid, node);

    // get a random closest neighbor node that has been visited already
    let closestNodes = neighbors.filter((node) => node.visited === true);
    let randomClosestNode =
      closestNodes[Math.floor(Math.random() * closestNodes.length)];

    // midpoint of current node and next node
    let dirRow = Math.floor((node.row + randomClosestNode.row) / 2);
    let dirCol = Math.floor((node.col + randomClosestNode.col) / 2);

    // connect path
    pathNodesInOrder.push(randomClosestNode);
    pathNodesInOrder.push(grid[dirRow][dirCol]);
    pathNodesInOrder.push(node);

    // push all neighbors
    arr.push(...neighbors);
  }

  return pathNodesInOrder;
}

function getNeighborNodes(grid, node) {
  const rows = grid.length;
  const cols = grid[0].length;

  let neighbors = [];

  for (let i = 0; i < directionsNoDiag.length; i++) {
    let direction = directionsNoDiag[i];
    let newRow = node.row + 2 * direction[0];
    let newCol = node.col + 2 * direction[1];

    if (
      newRow >= 0 &&
      newCol >= 0 &&
      newRow < rows &&
      newCol < cols &&
      grid[newRow][newCol] !== Type.Goal
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
}
