import * as utils from "../utilities";

export function aStar(
  grid,
  start,
  goal,
  heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
) {
  function comparator(a, b) {
    if (isNaN(a.f - b.f)) {
      return 0;
    } else {
      return a.f - b.f;
    }
  }

  function key(node) {
    return "".concat(node.row, " ", node.col);
  }

  var open = new utils.PriorityQueue(comparator);
  var visitedInOrder = [];

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
      // return path
      return [dict[key(node)], visitedInOrder];
    }

    let neighbors = utils.getNeighbors(grid, node);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.closed) {
        continue;
      }

      let newDistance = node.distance + 1;

      if (!neighbor.opened || newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.f = neighbor.distance + heuristic(neighbor, goal);
        dict[key(neighbor)] = dict[key(node)].slice();
        dict[key(neighbor)].push(neighbor);

        if (!neighbor.opened) {
          open.add(neighbor);
          neighbor.opened = true;
        } else {
          open.updateItem(neighbor);
        }
      }
    }
  }
  return [[], visitedInOrder];
}