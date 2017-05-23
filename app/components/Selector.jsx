'use strict';
import React from 'react';

const Selector = (props) => {

  return (
     <select id={props.name} name={props.name} onChange={props.onChangeHandler}>
      {
       props.dataArr && props.dataArr.map(val => <option key={val} value={val}>{val.toUpperCase()}</option>)
      }
     </select>
  );
};

export default Selector;
