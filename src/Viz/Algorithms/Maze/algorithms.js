import { backtrack } from "./backtrack.js";
import { kruskal } from "./kruskal.js";

// Maze Generation algorithm selector
export const MazeAlgo = {
  "---": function init() {
    return [];
  },
  "Recursive Backtracking": backtrack,
  "Kruskal": kruskal,
};