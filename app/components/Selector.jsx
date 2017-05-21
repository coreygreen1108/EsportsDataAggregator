'use strict';
import React from 'react';

export const ConsoleSelector = (props) => {

  return (
     <select id="console" name="Console" onChange={props.onChangeHandlerConsole}>
      {
       props.consoles && props.consoles.map(console => <option key={console} value={console}>{console.toUpperCase()}</option>)
      }
     </select>
  );
};

export const CommandSelector = (props) => {

  return (
     <select id="console" name="Console" onChange={props.onChangeHandlerCommand}>
      {
       props.commands && props.commands.map(command => <option key={command} value={command}>{command.toUpperCase()}</option>)
      }
     </select>
  );
};


 // <div>
 //              <select id="command" name="Command">
 //                <option value="getgodranks">Get God Rankings</option>
 //                <option value="getfriends">Get Friends</option>
 //                <option value="getmatchhistory">Get Match History</option>
 //                <option value="getmatchhistory">Get Player</option>
 //              </select>
 //            </div>


