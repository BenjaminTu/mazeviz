import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      nodeType,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    return (
      <div
        // prevent from dragging
        draggable="false"
        // render by type
        className={"flex-item node".concat(" ", nodeType).trim()}
        // mouse event functions
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
