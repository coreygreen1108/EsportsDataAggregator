'use strict';
import React from 'react';

export default class SomeThing extends React.Component  {
   constructor(){
    super();
   }

   render() {
    return (

   <div>
      <h1>Smite Visualization Tool</h1>
      <p> What up! </p>
        <form action="/godinfo" method="get">
          <div>
            <select id="console" name="Console">
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="PS4">PS4</option>
            </select>
          </div>
          <div>
            <select id="command" name="Command">
              <option value="getgodranks">Get God Rankings</option>
              <option value="getfriends">Get Friends</option>
              <option value="getmatchhistory">Get Match History</option>
              <option value="getmatchhistory">Get Player</option>
            </select>
          </div>
          <div>
            <input id="target" type="text" name="target" placeholder="Enter Player Target" />
          </div>
          <button type="button" id="search">Find Data!</button>
        </form>

      </div>

    );

   }

}



