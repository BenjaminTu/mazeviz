import { backtrack } from "./backtrack.js";
import { kruskal } from "./kruskal.js";
import { prim } from "./prim.js";

// Maze Generation algorithm selector
export const MAZE_ALGO = {
  "Recursive Backtracker": backtrack,
  "Kruskal's": kruskal,
  "Prim's": prim,
};
