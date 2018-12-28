import React from 'react';

function Square(props) {
  let classes = `square ${props.extraClass}`
  return (
    <button className={classes} onClick={props.onClick} >
      {props.value}
    </button>
  );
}

export default Square;