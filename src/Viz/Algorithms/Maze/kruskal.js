import { DisjointSet, shuffle } from "../utilities";

// maze generator with kruskal's algorithm (union find)
export function kruskal(grid, start) {
  const rows = grid.length;
  const cols = grid[0].length;

  let pathNodesInOrder = [];

  let edges = [];

  for (let i = 0; i < rows; i += 2) {
    for (let j = 0; j < cols; j += 2) {
      // vertical path (2 rows below)
      edges.push([i, j, [2, 0]]);
      // horizontal path (2 cols to the right)
      edges.push([i, j, [0, 2]]);
    }
  }

  // shuffle path
  shuffle(edges);

  var forest = new DisjointSet(rows * cols);

  while (!!edges.length) {
    // get random path
    let [row, col, direction] = edges.pop();

    let newRow = row + direction[0];
    let newCol = col + direction[1];

    // node is represented by its number in grid
    let indexA = row * rows + col;
    let indexB = newRow * rows + newCol;

    // neighbor node is out of bounds
    if (newRow >= rows || newCol >= cols) {
      continue;
    }

    // if current node and next node is not reachable
    if (!forest.find(indexA, indexB)) {
      // make it reachable
      forest.union(indexA, indexB);

      // midpoint of current node and next node
      let dirRow = Math.floor((newRow + row) / 2);
      let dirCol = Math.floor((newCol + col) / 2);

      // push maze node
      pathNodesInOrder.push(grid[row][col]);
      pathNodesInOrder.push(grid[dirRow][dirCol]);
      pathNodesInOrder.push(grid[newRow][newCol]);
    }
  }

  return pathNodesInOrder;
}
