import React from 'react';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: null,
      }],
      stepNumber: 0,
      selectedMove: 0,
      isReviewing: false,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares)[0] || squares[i]) {
      this.setState({selectedMove: i,});
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{squares: squares, move: i}]),
      stepNumber: history.length,
      selectedMove: i,
      isReviewing: false,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isReviewing: true,
      xIsNext: (step % 2) === 0,
    });
  }

  coordinates(move) {
    let y = Math.floor(move / 3)
    let x = move % 3
    return `(${x},${y})`
  }

  getStatus(winner, history) {
    switch (winner) {
    case "X":
    case "O": return "Winner: " + winner;
      break;
    default:
      if (history.length > 9 && !this.state.isReviewing)
        return "No winner: Stalemate"
      else
        return `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }
  }

  getMoves(history) {
    let selectedIsSet;
    return history.map((step, move) => {
      let classes = ""
      const desc = move ? `Go to move #${move} ${this.coordinates(step.move)}` : 'Go to game start';
      if(step.squares[this.state.selectedMove] && !selectedIsSet) {
        classes = "selected"
        selectedIsSet = true
      }

      return (
          <li key={move}><button className={classes} onClick={() => this.jumpTo(move)}>{desc}</button></li>
      )
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const [winner, vector] = calculateWinner(current.squares);
    const moves = this.getMoves(history);

    let status = this.getStatus(winner, history);

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} winVector={vector} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const vectors = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (const v of vectors) {
    const [a, b, c] = v;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return [squares[a], v];
  }

  return [null, null];
}

export default Game
