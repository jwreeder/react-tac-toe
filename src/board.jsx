import React from 'react';
import Square from './square';

class Board extends React.Component {
  renderSquare(i) {
    let extraClass = ""
    if (this.props.winVector) {
      if (this.props.winVector.includes(i))
        extraClass = "winner"
    }
    return (
      <Square key={i} extraClass={extraClass} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    );
  }

  renderRow(rowNum, indices) {
    return (
      <div key={rowNum} className="board-row">
        { indices.map(idx => this.renderSquare(idx)) }
      </div>
    );
  }

  render() {
    return (
      <div>
        { [0,3,6].map(i => this.renderRow(i, [0,1,2].map(j => j + i))) }
      </div>
    );
  }
}

export default Board;
