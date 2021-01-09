import { Type, directions, shuffle } from "../utilities";

export function backtrack(grid, node, pathNodesInOrder) {
  const rows = grid.length;
  const cols = grid[0].length;

  let randDirections = directions.slice();

  shuffle(randDirections);
  node.visited = true;

  for (let i = 0; i < randDirections.length; i++) {
    let direction = randDirections[i];
    let newRow = node.row + 2 * direction[0];
    let newCol = node.col + 2 * direction[1];

    if (
      newRow >= 0 &&
      newCol >= 0 &&
      newRow < rows &&
      newCol < cols &&
      grid[newRow][newCol] !== Type.Goal &&
      !grid[newRow][newCol].visited
    ) {
      let dirRow = Math.floor((newRow + node.row) / 2);
      let dirCol = Math.floor((newCol + node.col) / 2);

      pathNodesInOrder.push(node);
      pathNodesInOrder.push(grid[dirRow][dirCol]);
      // backtrack
      backtrack(grid, grid[newRow][newCol], pathNodesInOrder);
    }
  }


  return pathNodesInOrder;
}
