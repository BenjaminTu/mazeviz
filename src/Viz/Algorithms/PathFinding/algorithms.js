import { dfs } from "./dfs.js";
import { bfs } from "./bfs.js";
import { dijkstra } from "./dijkstra.js";
import { aStar } from "./aStar";

// Algorithm selector
export const Algo = {
    "DFS": dfs,
    "BFS": bfs,
    "Dijkstra": dijkstra,
    "A*": aStar,
  };