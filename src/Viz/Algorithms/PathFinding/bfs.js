import * as utils from "../utilities";

export function bfs(grid, start, goal) {
  var q = [];
  var visitedInOrder = [];

  q.push([start, [start]]);

  while (!!q.length) {
    let [node, path] = q.shift();

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
        q.push([neighbor, newPath]);
      }
    }
  }
  return [[], visitedInOrder];
}
