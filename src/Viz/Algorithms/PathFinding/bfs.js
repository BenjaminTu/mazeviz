import * as utils from "../utilities";

// Path finding with Breadth First Search
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

    // push to queue for every not-yet-visited neighbor
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

  // no path found
  return [[], visitedInOrder];
}
