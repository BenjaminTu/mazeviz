import {aStar} from "./aStar";

export function dijkstra(grid, start, goal) {
  function heuristic(a, b) {
    return 0;
  }
  return aStar(grid, start, goal, heuristic);
}