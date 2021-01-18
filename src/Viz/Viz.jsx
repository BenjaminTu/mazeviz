import React, { Component } from "react";
import Node from "./Node/Node";
import { Type } from "./Algorithms/utilities";
import { PATH_ALGO } from "./Algorithms/PathFinding/algorithms";
import { MAZE_ALGO } from "./Algorithms/Maze/algorithms";

import "./Viz.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Constants

const INITIAL_ROWS = 29;
const INITIAL_COLS = 57;

const INITIAL_START = { r: 10, c: 10 };
const INITIAL_GOAL = { r: 10, c: 46 };

const ANIMATION_SPEED = {
  "0.5x": 96,
  "1x": 48,
  "1.5x": 36,
  "2x": 24,
  Instant: 0,
};

export default class Viz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // grid state
      start: INITIAL_START,
      goal: INITIAL_GOAL,
      grid: this.initGrid(INITIAL_ROWS, INITIAL_COLS),

      // current algorithm
      pathAlgo: "",
      mazeAlgo: "",

      // algorithm stats
      pathLength: 0,
      time: 0,

      // diagonal movement
      diag: false,

      // mouse states
      dragType: Type.Empty,
      disabled: false,
      mouseIsPressed: false,

      // current animation speed
      animationSpeed: ANIMATION_SPEED["1x"],
    };
  }

  // Init Mount (Tab Name, Disable Button)
  componentDidMount() {
    document.title = "Path Visualizer";
    document.getElementById("path-button").disabled = true;
    document.getElementById("maze-button").disabled = true;
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

    // clear stats
    this.displayStats(0, 0);

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
        }

        // prevent from reverting to types from previous search
        grid[r][c].prevNodeType = Type.Empty;
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
    // disable selects and button
    var elements = document.querySelectorAll("button");
    elements.forEach((element) => (element.disabled = true));
    this.setState({ disabled: true });
  }

  // enable all inputs
  enableInput() {
    const { pathAlgo, mazeAlgo } = this.state;

    // enable if not default mode
    if (pathAlgo !== "---") {
      document.getElementById("path-button").disabled = false;
    }

    // enable if not default mode
    if (mazeAlgo !== "---") {
      document.getElementById("maze-button").disabled = false;
    }

    document.getElementById("clear-button").disabled = false;

    this.setState({ disabled: false });
  }

  // set diagonal movement
  setDiag(event) {
    this.setState({ diag: event.target.checked });
  }

  // set pathfinding algorithm
  setPathAlgo(event) {
    const { disabled } = this.state;
    let mode = event.target.value;

    if (!(mode in PATH_ALGO)) {
      // not a valid algorithm
      return;
    }

    // enable button if not default option or during animation
    if (!disabled && mode !== "---") {
      document.getElementById("path-button").disabled = false;
    }

    this.setState({ pathAlgo: mode });
  }

  // calculate path length
  getPathLength(path) {
    let length = 0;
    for (let i = 0; i < path.length - 1; i++) {
      let curNode = path[i];
      let nextNode = path[i + 1];
      let dx = Math.abs(curNode.row - nextNode.row);
      let dy = Math.abs(curNode.col - nextNode.col);

      length += dx === 0 || dy === 0 ? 1 : Math.SQRT2;
    }

    return length;
  }

  // display stats
  displayStats(length, time) {
    this.setState({ pathLength: length, time: time });

    document.getElementById("length").className =
      length === 0 ? "hide" : "show";

    document.getElementById("time").className = time === 0 ? "hide" : "show";
  }

  // animate pathfinding algorithms
  animateSearch() {
    const { grid, start, goal, pathAlgo, diag, animationSpeed } = this.state;

    // clear cache
    this.clearCache();

    let t0 = performance.now();

    // perform search
    const [path, visitedInOrder] = PATH_ALGO[pathAlgo](
      grid,
      grid[start.r][start.c],
      grid[goal.r][goal.c],
      diag
    );

    // get execution time
    let executionTime = performance.now() - t0;

    // get path length
    let length = this.getPathLength(path);

    // display stats
    this.displayStats(length, executionTime);

    // disable input during animation
    this.disableInput();

    // concatenate all nodes to animate
    const nodesToAnimate = visitedInOrder.concat(path);

    for (let i = 0; i < nodesToAnimate.length; i++) {
      let node = nodesToAnimate[i];
      if (node.nodeType === Type.Start || node.nodeType === Type.Goal) {
        if (
          node.nodeType === Type.Start &&
          nodesToAnimate.length === visitedInOrder.length
        ) {
          // no path found
          node.prevNodeType = Type.Visited;
          continue;
        }
        // set start/goal nodes previous type to path for indicate path when moving start/goal
        node.prevNodeType = Type.Path;
        continue;
      }

      let assignType = i < visitedInOrder.length ? Type.Visited : Type.Path;

      // setTimeout does not work with 0ms
      if (animationSpeed !== 0) {
        setTimeout(() => {
          node.nodeType = assignType;
          // set state for new render (force animation)
          this.setState({ grid });
        }, animationSpeed * i);
      } else {
        node.nodeType = assignType;
      }
    }

    // enable input after animation
    setTimeout(() => {
      this.enableInput();
    }, animationSpeed * nodesToAnimate.length);
  }

  /* Maze Functions */

  // set maze generation algorithm
  setMazeAlgo(event) {
    const { disabled } = this.state;
    let mode = event.target.value;

    if (!(mode in MAZE_ALGO)) {
      // not a valid algorithm
      return;
    }

    // enable button if not default option or during animation
    if (!disabled && mode !== "---") {
      document.getElementById("maze-button").disabled = false;
    }

    this.setState({ mazeAlgo: mode });
  }

  // animate maze generation
  generateMaze() {
    const { grid, start, animationSpeed, mazeAlgo } = this.state;

    let t0 = performance.now();

    let pathNodesInOrder = MAZE_ALGO[mazeAlgo](grid, grid[start.r][start.c]);

    let executionTime = performance.now() - t0;

    this.displayStats(0, executionTime);

    // clear all cache
    this.clearCache();

    // disable input during animation
    this.disableInput();

    // set all cells to wall
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        let curType = grid[r][c].nodeType;
        if (curType !== Type.Start && curType !== Type.Goal) {
          // Walls with no zoom effect
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

      // setTimeout does not work with 0ms
      if (animationSpeed !== 0) {
        setTimeout(() => {
          node.nodeType = Type.Empty;
          // set state for new render (force animation)
          this.setState({ grid });
        }, animationSpeed * i);
      } else {
        node.nodeType = Type.Empty;
      }
    }

    // enable input after animation
    setTimeout(() => {
      this.enableInput();
    }, animationSpeed * pathNodesInOrder.length);

    this.setState({ grid });
  }

  // set animation speed
  setAnimationSpeed(event) {
    let speed = event.target.value;

    if (!(speed in ANIMATION_SPEED)) {
      // not a valid algorithm
      return;
    }
    console.log(speed);
    this.setState({ animationSpeed: ANIMATION_SPEED[speed] });
  }

  /* Render */

  render() {
    const { grid, pathLength, time } = this.state;

    return (
      <>
        <div className="panel">
          <div className="title">
            <p className="h1">MazeViz</p>
            <footer>
              Project Hosted on
              <a href="https://github.com/BenjaminTu/mazeviz"> Github</a>
            </footer>
          </div>

          <div className="left">
            <small className="path-title">Pathfinding Algorithm:</small>
            <select
              id="path"
              className="d-block m-2 top"
              onChange={(e) => this.setPathAlgo(e)}
            >
              <option selected disabled>
                ---
              </option>
              {Object.keys(PATH_ALGO).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className="bot">
              <input
                type="checkbox"
                className="checkbox mr-1"
                onChange={(e) => this.setDiag(e)}
              ></input>
              Allow Diagonal Movement
            </label>

            <button
              id="path-button"
              className="btn btn-sm btn-success rt"
              onClick={() => this.animateSearch()}
            >
              Search Path
            </button>
          </div>

          <div className="right">
            <button
              id="clear-button"
              className="btn btn btn-primary d-block"
              onClick={() => this.clearBoard()}
            >
              Clear Board
            </button>
          </div>

          <div className="middle">
            <small className="path-title">Maze Generation Algorithm:</small>
            <select
              id="maze"
              className="lt"
              onChange={(e) => this.setMazeAlgo(e)}
            >
              <option selected disabled>
                ---
              </option>
              {Object.keys(MAZE_ALGO).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              id="maze-button"
              className="btn btn-sm btn-success ml-2 rtrt"
              onClick={() => this.generateMaze()}
            >
              Generate Maze
            </button>
          </div>

          <div className="knob">
            <small>Speed:</small>
            <select className="lt" onChange={(e) => this.setAnimationSpeed(e)}>
              {Object.keys(ANIMATION_SPEED).map((option, index) => (
                <option key={index} value={option} selected={option === "1x"}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="stats">
            <small className="show">Algorithm Stats:</small>
            <div className="stats-panel">
              <small id="length" className="h6 hide">
                path length: {pathLength.toFixed(2)} unit
              </small>
              <br></br>
              <small id="time" className="h6 hide">
                time taken: {time.toFixed(2)} ms
              </small>
            </div>
          </div>
        </div>

        <div className="flex-container grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="flex-nowrap d-flex flex-row justify-content-center overflow-hidden">
                  {row.map((node, nodeIdx) => {
                    const { row, col, nodeType } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        row={row}
                        col={col}
                        nodeType={nodeType}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
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
