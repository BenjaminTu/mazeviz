import * as utils from "../utilities";

export function dfs(grid, start, goal) {
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

    let neighbors = utils.getNeighbors(grid, node);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!neighbor.visited) {
        let newPath = path.slice();
        newPath.push(neighbor);
        stk.push([neighbor, newPath]);
      }
    }
  }
  return [[], visitedInOrder];
}
