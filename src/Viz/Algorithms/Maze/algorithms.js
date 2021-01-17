import { backtrack } from "./backtrack.js";
import { kruskal } from "./kruskal.js";

// Maze Generation algorithm selector
export const MAZE_ALGO = {
  "Recursive Backtracker": backtrack,
  "Kruskal's": kruskal,
};
