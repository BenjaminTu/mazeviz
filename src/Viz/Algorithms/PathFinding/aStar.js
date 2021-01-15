import {getNeighbors, PriorityQueue} from "../utilities";

// Pathfinding with A*
export function aStar(grid, start, goal, diag, heuristic) {

  // if heuristic function is not provided
  if (heuristic === undefined) {
    if (diag) {
      // octile distance for diagonal movements
      heuristic = function (a, b) {
        let dx = Math.abs(a.row - b.row);
        let dy = Math.abs(a.col - b.col);

        return 1 * (dx + dy) + (Math.SQRT2 - 2 * 1) * Math.min(dx, dy);
      };
    } else {
      // manhattan distance for non-diagonal movements
      heuristic = function (a, b) {
        let dx = Math.abs(a.row - b.row);
        let dy = Math.abs(a.col - b.col);

        return dx + dy;
      };
    }
  }

  // custom hash value for node
  function key(node) {
    return "".concat(node.row, " ", node.col);
  }

  var open = new PriorityQueue((a, b) => {
    return a.f - b.f;
  });
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

    let neighbors = getNeighbors(grid, node, diag);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.closed) {
        continue;
      }

      // 1 for no diagonal, SQRT2 for diagonal
      let travelDistance =
        neighbor.row - node.row === 0 || neighbor.col - node.col === 0
          ? 1
          : Math.SQRT2;
      let newDistance = node.distance + travelDistance;

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
