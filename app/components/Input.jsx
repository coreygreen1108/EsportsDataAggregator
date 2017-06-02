'use strict';
import React from 'react';

const Input = (props) => {

  return (
    <input id={props.name} type="text" name={props.name} placeholder={`Enter ${props.name}`} value={props.value} onChange={props.onChangeHandler} />
  );
};

export default Input;

