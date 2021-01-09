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
        className={"node".concat(" ", nodeType).trim()}
        id={"node-".concat(row, "-", col)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
