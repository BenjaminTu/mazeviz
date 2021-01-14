import { dfs } from "./dfs.js";
import { bfs } from "./bfs.js";
import { dijkstra } from "./dijkstra.js";
import { aStar } from "./aStar";

// Pathfinding algorithm selector
export const Algo = {
  "---": function init() {
    return [[], []];
  },
  "A*": aStar,
  "BFS": bfs,
  "DFS": dfs,
  "Dijkstra": dijkstra,
};
