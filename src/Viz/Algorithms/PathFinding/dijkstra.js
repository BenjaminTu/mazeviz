import { aStar } from "./aStar";

// Path Finding with Dijkstra's Algorithm
export function dijkstra(grid, start, goal) {
  function heuristic(a, b) {
    return 0;
  }
  // dijkstra is A* with no heuristic function
  return aStar(grid, start, goal, heuristic);
}
