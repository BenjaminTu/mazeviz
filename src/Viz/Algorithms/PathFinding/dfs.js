import * as utils from "../utilities";

// Pathfinding with Depth First Search 
export function dfs(grid, start, goal, diag) {
  var stk = [];
  var visitedInOrder = [];

  stk.push([start, [start]]);

  while (!!stk.length) {
    let [node, path] = stk.pop();

    if (node.visited) {
      continue;
    }

    node.visited = true;
    visitedInOrder.push(node);
    if (node === goal) {
      return [path, visitedInOrder];
    }

    // push to stack for every not-yet-visited neighbor
    let neighbors = utils.getNeighbors(grid, node, diag);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!neighbor.visited) {
        let newPath = path.slice();
        newPath.push(neighbor);
        stk.push([neighbor, newPath]);
      }
    }
  }

  // no path found
  return [[], visitedInOrder];
}
