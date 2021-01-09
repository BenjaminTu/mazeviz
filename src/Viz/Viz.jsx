import React, { Component } from "react";
import Node from "./Node/Node";
import { Type } from "./Algorithms/utilities";
import { Algo } from "./Algorithms/PathFinding/algorithms";

import { backtrack } from "./Algorithms/Maze/backtrack";

import "./Viz.css";

const INITIAL_ROWS = 27;
const INITIAL_COLS = 53;

const INITIAL_START = { r: 10, c: 10 };
const INITIAL_GOAL = { r: 10, c: 43 };

const ANIMATION_SPEED = 20;
const MAZE_SPEED = 20;

export default class Viz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: INITIAL_START,
      goal: INITIAL_GOAL,
      grid: this.initGrid(INITIAL_ROWS, INITIAL_COLS),
      curAlgo: function init() {
        return [[], []];
      },
      dragType: Type.Empty,
      disabled: false,
      mouseIsPressed: false,
      animationSpeed: ANIMATION_SPEED,
    };
  }

  /* Grid Functions */

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

  clearWall() {
    const { grid } = this.state;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const curType = grid[r][c].nodeType;
        if (curType !== Type.Start && curType !== Type.Goal) {
          this.setNodeType(r, c, Type.Empty);
        } else {
          grid[r][c].prevNodeType = Type.Empty;
        }
      }
    }

    this.setState(grid);
  }

  /* Node Functions */

  setNodeType(row, col, assignType) {
    const { grid } = this.state;
    if (grid[row][col].nodeType !== assignType) {
      grid[row][col].prevNodeType = grid[row][col].nodeType;
    }
    grid[row][col].nodeType = assignType;
  }

  revertNodeType(row, col) {
    const { grid } = this.state;
    grid[row][col].nodeType = grid[row][col].prevNodeType;
  }
  /* Mouse Events */

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
        this.setNodeType(row, col, Type.Wall);
        break;
      case Type.Wall:
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

  // Mouse Hover
  // TODO: Bug when clear walls after animation
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
        if (curType !== Type.Start && curType !== Type.Goal) {
          this.setNodeType(row, col, Type.Wall);
        }
        break;
      case Type.Wall:
        if (curType === Type.Wall) {
          this.revertNodeType(row, col);
        }
        break;
      case Type.Start:
        if (curType !== Type.Wall && curType !== Type.Goal) {
          this.revertNodeType(start.r, start.c);
          this.setNodeType(row, col, Type.Start);
          this.setState({ start: { r: row, c: col } });
        }
        break;
      case Type.Goal:
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

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  /* Path Finding Algorithm Functions */

  disableInput() {
    var elements = document.querySelectorAll("button, input");
    elements.forEach((element) => (element.disabled = true));
    this.setState({ disabled: true });
  }

  enableInput(time) {
    setTimeout(() => {
      var elements = document.querySelectorAll("button, input");
      elements.forEach((element) => (element.disabled = false));
      this.setState({ disabled: false });
    }, time);
  }

  clearCache() {
    const { grid } = this.state;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        grid[r][c].visited = false;
        grid[r][c].opened = false;
        grid[r][c].closed = false;

        grid[r][c].distance = Infinity;
        grid[r][c].f = Infinity;

        let curType = grid[r][c].nodeType;

        // clear visited cache
        if (curType === Type.Visited || curType === Type.Path) {
          grid[r][c].nodeType = Type.Empty;
        }
      }
    }
  }

  setAlgo(mode) {
    if (!(mode in Algo)) {
      // not a valid algorithm
      return;
    }
    this.setState({ curAlgo: Algo[mode] });
  }

  animateSearch() {
    const { grid, start, goal, curAlgo, animationSpeed } = this.state;

    this.clearCache();
    const [path, visitedInOrder] = curAlgo(
      grid,
      grid[start.r][start.c],
      grid[goal.r][goal.c]
    );

    this.disableInput();

    const nodesToAnimate = visitedInOrder.concat(path);

    for (let i = 0; i < nodesToAnimate.length; i++) {
      let node = nodesToAnimate[i];
      if (node.nodeType === Type.Start || node.nodeType === Type.Goal) {
        node.prevNodeType = Type.Path;
        continue;
      }

      let assignType = i < visitedInOrder.length ? Type.Visited : Type.Path;
      setTimeout(() => {
        node.nodeType = assignType;

        // force update for animation
        this.setState({ grid });
      }, animationSpeed * i);
    }

    // enable interactive elements after animation
    this.enableInput(animationSpeed * nodesToAnimate.length);
  }

  /* Maze Functions */

  generateMaze() {
    const { grid, start, animationSpeed } = this.state;
    let pathNodesInOrder = [];
    backtrack(grid, grid[start.r][start.c], pathNodesInOrder);

    this.clearCache();

    this.disableInput();

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        let curType = grid[r][c].nodeType;
        if (curType !== Type.Start && curType !== Type.Goal) {
          this.setNodeType(r, c, Type.Wall);
        }
      }
    }

    this.setState({ grid });

    for (let i = 0; i < pathNodesInOrder.length; i++) {
      let node = pathNodesInOrder[i];
      if (node.nodeType === Type.Start || node.nodeType === Type.Goal) {
        continue;
      }
      setTimeout(() => {
        node.nodeType = Type.Empty;
        // force update for animation
        this.setState({ grid });
      }, MAZE_SPEED * i);
    }
    this.enableInput(MAZE_SPEED * pathNodesInOrder.length);
  }

  /* Render */

  render() {
    const { grid, start, goal } = this.state;
    // console.log("start is at " + start.r + " " + start.c);
    // console.log("goal is at " + goal.r + " " + goal.c);
    return (
      <>
        <div className="panel">
          <button onClick={() => this.clearWall()}> Clear Walls </button>
          <button onClick={() => this.setAlgo("DFS")}>DFS</button>
          <button onClick={() => this.setAlgo("BFS")}>BFS</button>
          <button onClick={() => this.setAlgo("Dijkstra")}>Dijkstra</button>
          <button onClick={() => this.setAlgo("A*")}>A*</button>
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
