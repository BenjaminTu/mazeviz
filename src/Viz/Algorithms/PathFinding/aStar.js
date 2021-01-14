import * as utils from "../utilities";

// Pathfinding with A*
export function aStar(
  grid,
  start,
  goal,
  diag,
  // default heuristic function for astar
  heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
) {
  // custom node comparator for heap
  function comparator(a, b) {
    if (isNaN(a.f - b.f)) {
      return 0;
    } else {
      return a.f - b.f;
    }
  }

  // custom hash value for node
  function key(node) {
    return "".concat(node.row, " ", node.col);
  }

  var open = new utils.PriorityQueue(comparator);
  var visitedInOrder = [];

  // (K, V) => (node, path to node from start)
  var dict = {};

  start.distance = 0;
  start.f = 0;
  start.opened = true;
  dict[key(start)] = [start];
  open.add(start);

  while (!open.isEmpty()) {
    let node = open.poll();
    node.closed = true;

    visitedInOrder.push(node);
    if (node === goal) {
      // return path and visited nodes
      return [dict[key(node)], visitedInOrder];
    }

    let neighbors = utils.getNeighbors(grid, node, diag);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.closed) {
        continue;
      }

      // 1 for no diagonal, 1.4 for diagonal
      let newDistance = node.distance + diag? 1 : 1.4;

      // if not processed or should be updated
      if (!neighbor.opened || newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.f = neighbor.distance + heuristic(neighbor, goal);

        // push new path to hash table
        dict[key(neighbor)] = dict[key(node)].slice();
        dict[key(neighbor)].push(neighbor);

        if (!neighbor.opened) {
          open.add(neighbor);
          neighbor.opened = true;
        } else {
          // update because we've updated f value
          open.updateItem(neighbor);
        }
      }
    }
  }

  // no path found
  return [[], visitedInOrder];
}
