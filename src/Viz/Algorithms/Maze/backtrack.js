import { Type, directionsNoDiag, shuffle } from "../utilities";

// maze generator with recursive backtracking
export function backtrack(grid, start) {
  let pathNodesInOrder = []
  backtrackHelper(grid, start, pathNodesInOrder);
  return pathNodesInOrder;
}

function backtrackHelper(grid, node, pathNodesInOrder) {
  const rows = grid.length;
  const cols = grid[0].length;

  let randDirections = directionsNoDiag.slice();

  shuffle(randDirections);
  node.visited = true;

  for (let i = 0; i < randDirections.length; i++) {
    let direction = randDirections[i];
    
    // next node (2 becuase there are walls in between)
    let newRow = node.row + 2 * direction[0];
    let newCol = node.col + 2 * direction[1];

    // if next node is within grid and visited (and not a goal)
    if (
      newRow >= 0 &&
      newCol >= 0 &&
      newRow < rows &&
      newCol < cols &&
      grid[newRow][newCol] !== Type.Goal &&
      !grid[newRow][newCol].visited
    ) {

      // midpoint of current node and next node
      let dirRow = Math.floor((newRow + node.row) / 2);
      let dirCol = Math.floor((newCol + node.col) / 2);

      // add cells to path
      pathNodesInOrder.push(node);
      pathNodesInOrder.push(grid[dirRow][dirCol]);
      pathNodesInOrder.push(grid[newRow][newCol]);

      // backtrack
      backtrackHelper(grid, grid[newRow][newCol], pathNodesInOrder);
    }
  }

  return pathNodesInOrder;
}
