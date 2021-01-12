import React, { Component } from "react";
import Node from "./Node/Node";
import { Type } from "./Algorithms/utilities";
import { Algo } from "./Algorithms/PathFinding/algorithms";
import { backtrack } from "./Algorithms/Maze/backtrack";

import "./Viz.css";

// Constants

const INITIAL_ROWS = 27;
const INITIAL_COLS = 53;

const INITIAL_START = { r: 10, c: 10 };
const INITIAL_GOAL = { r: 10, c: 43 };

const ANIMATION_SPEED = 20;

export default class Viz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // grid state
      start: INITIAL_START,
      goal: INITIAL_GOAL,
      grid: this.initGrid(INITIAL_ROWS, INITIAL_COLS),
      
      // current pathfinding algorithm
      pathAlgo: function init() {
        return [[], []];
      },

      // mouse states
      dragType: Type.Empty,
      disabled: false,
      mouseIsPressed: false,

      // current animation speed
      animationSpeed: ANIMATION_SPEED,
    };
  }

  /* Grid Functions */

  // initial grid functions
  initGrid(rows, cols) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const curRow = [];
      for (let col = 0; col < cols; col++) {
        let assignType = Type.Empty;
        if (INITIAL_START.r === row && INITIAL_START.c === col) {
          assignType = Type.Start;
        }
        if (INITIAL_GOAL.r === row && INITIAL_GOAL.c === col) {
          assignType = Type.Goal;
        }

        // initial node properties
        let node = {
          row: row,
          col: col,
          prevNodeType: Type.Empty,
          nodeType: assignType,
          visited: false,
          distance: Infinity,
          f: Infinity,
          opened: false,
          closed: false,
        };

        curRow.push(node);
      }
      grid.push(curRow);
    }
    return grid;
  }

  // clear all the wall/visited/path nodes
  clearBoard() {
    const { grid } = this.state;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const curType = grid[r][c].nodeType;
        if (curType !== Type.Start && curType !== Type.Goal) {
          this.setNodeType(r, c, Type.Empty);
        } else {
          // prevent from start/goal reverting to anything other than empty nodes
          grid[r][c].prevNodeType = Type.Empty;
        }
      }
    }

    this.setState(grid);
  }

  // clear node caches before starting next search/animation
  clearCache() {
    const { grid } = this.state;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        // clear data
        grid[r][c].visited = false;
        grid[r][c].opened = false;
        grid[r][c].closed = false;

        grid[r][c].distance = Infinity;
        grid[r][c].f = Infinity;

        let curType = grid[r][c].nodeType;

        // clear visited cache
        if (curType === Type.Visited || curType === Type.Path) {
          this.setNodeType(r, c, Type.Empty);
        } else if (curType === Type.Wall) {
          // prevent from reverting to types from previous search 
          grid[r][c].prevNodeType = Type.Empty;
        }
      }
    }

    this.setState(grid);
  }

  /* Node Functions */

  // set node given type, set current type to previous type accordingly
  setNodeType(row, col, assignType) {
    const { grid } = this.state;
    if (grid[row][col].nodeType !== assignType) {
      grid[row][col].prevNodeType = grid[row][col].nodeType;
    }
    grid[row][col].nodeType = assignType;
  }

  // revert node type to its previous  type
  revertNodeType(row, col) {
    const { grid } = this.state;
    grid[row][col].nodeType = grid[row][col].prevNodeType;
  }

  /* Mouse Events */

  // mouse down event
  handleMouseDown(row, col) {
    const { grid, disabled } = this.state;

    if (disabled) {
      return;
    }

    const curType = grid[row][col].nodeType;

    switch (curType) {
      case Type.Empty:
      case Type.Visited:
      case Type.Path:
        // set empty/visited/path nodes to wall
        this.setNodeType(row, col, Type.Wall);
        break;
      case Type.Wall:
        // revert wall nodes to previous type
        this.revertNodeType(row, col);
        break;
      default:
        break;
    }

    this.setState({
      grid: grid,
      dragType: curType,
      mouseIsPressed: true,
    });
  }

  // mouse hover event
  handleMouseEnter(row, col) {
    const {
      grid,
      start,
      goal,
      disabled,
      mouseIsPressed,
      dragType,
    } = this.state;

    // ignore if disabled or mouse is not pressed
    if (disabled || !mouseIsPressed) {
      return;
    }

    const curType = grid[row][col].nodeType;
    switch (dragType) {
      case Type.Empty:
      case Type.Visited:
      case Type.Path:
        // set empty/visited/path nodes to wall
        if (curType !== Type.Start && curType !== Type.Goal) {
          this.setNodeType(row, col, Type.Wall);
        }
        break;
      case Type.Wall:
        // revert to previous types
        if (curType === Type.Wall) {
          this.revertNodeType(row, col);
        }
        break;
      case Type.Start:
        // move start and revert previous start
        if (curType !== Type.Wall && curType !== Type.Goal) {
          this.revertNodeType(start.r, start.c);
          this.setNodeType(row, col, Type.Start);
          this.setState({ start: { r: row, c: col } });
        }
        break;
      case Type.Goal:
        // move goal and revert previous goal
        if (curType !== Type.Wall && curType !== Type.Start) {
          this.revertNodeType(goal.r, goal.c);
          this.setNodeType(row, col, Type.Goal);
          this.setState({ goal: { r: row, c: col } });
        }
        break;
      default:
    }

    this.setState(grid);
  }

  // mouse up event
  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  /* Pathfinding Algorithm Functions */

  // disable all inputs
  disableInput() {
    var elements = document.querySelectorAll("button, input");
    elements.forEach((element) => (element.disabled = true));
    this.setState({ disabled: true });
  }

  // enable all inputs after given time(ms)
  enableInput(time) {
    setTimeout(() => {
      var elements = document.querySelectorAll("button, input");
      elements.forEach((element) => (element.disabled = false));
      this.setState({ disabled: false });
    }, time);
  }

  // set pathfinding algorithm
  setPathAlgo(mode) {
    if (!(mode in Algo)) {
      // not a valid algorithm
      return;
    }
    this.setState({ pathAlgo: Algo[mode] });
  }

  // animate pathfinding algorithms
  animateSearch() {
    const { grid, start, goal, pathAlgo, animationSpeed } = this.state;

    // clear cache
    this.clearCache();

    // perform search
    const [path, visitedInOrder] = pathAlgo(
      grid,
      grid[start.r][start.c],
      grid[goal.r][goal.c]
    );

    // disable input during animation
    this.disableInput();

    // concatenate all nodes to animate
    const nodesToAnimate = visitedInOrder.concat(path);

    for (let i = 0; i < nodesToAnimate.length; i++) {
      let node = nodesToAnimate[i];
      if (node.nodeType === Type.Start || node.nodeType === Type.Goal) {
        // set start/goal nodes previous type to path for indicate path when moving start/goal
        node.prevNodeType = Type.Path;
        continue;
      }

      let assignType = i < visitedInOrder.length ? Type.Visited : Type.Path;
      setTimeout(() => {
        node.nodeType = assignType;

        // set state for new render (force animation)
        this.setState({ grid });
      }, animationSpeed * i);
    }

    // enable input after animation
    this.enableInput(animationSpeed * nodesToAnimate.length);
  }

  /* Maze Functions */

  // animate maze generation
  generateMaze() {
    const { grid, start, animationSpeed } = this.state;
    
    let pathNodesInOrder = [];
    backtrack(grid, grid[start.r][start.c], pathNodesInOrder);

    // clear all cache
    this.clearCache();

    // disable input during animation
    this.disableInput();

    // set all cells to wall
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        let curType = grid[r][c].nodeType;
        if (curType !== Type.Start && curType !== Type.Goal) {
          this.setNodeType(r, c, Type.Wall);
        }
      }
    }

    // force render
    this.setState({ grid });

    // animation maze
    for (let i = 0; i < pathNodesInOrder.length; i++) {
      let node = pathNodesInOrder[i];
      if (node.nodeType === Type.Start || node.nodeType === Type.Goal) {
        continue;
      }
      setTimeout(() => {
        node.nodeType = Type.Empty;
        // set state for new render (force animation)
        this.setState({ grid });
      }, animationSpeed * i);
    }

    // enable input after animation
    this.enableInput(animationSpeed * pathNodesInOrder.length);
  }

  /* Render */

  render() {
    const { grid, start, goal } = this.state;
    return (
      <>
        <div className="panel">
          <button onClick={() => this.clearBoard()}> Clear Board </button>
          <button onClick={() => this.setPathAlgo("DFS")}>DFS</button>
          <button onClick={() => this.setPathAlgo("BFS")}>BFS</button>
          <button onClick={() => this.setPathAlgo("Dijkstra")}>Dijkstra</button>
          <button onClick={() => this.setPathAlgo("A*")}>A*</button>
          <button onClick={() => this.animateSearch()}>Animate</button>
          <button onClick={() => this.generateMaze()}>Maze</button>
        </div>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, nodeType } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      nodeType={nodeType}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
