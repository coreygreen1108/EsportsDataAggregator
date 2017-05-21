'use strict';
import React from 'react';
import {ConsoleSelector, CommandSelector} from '../components/Selector';
import {consoles, commands} from '../constants';


export default class App extends React.Component  {
   constructor(){
    super();
    this.state = {selectedConsole: 'PC', selectedCommand: 'getgodranks', target: ''};
    this.onChangeHandlerConsole = this.onChangeHandlerConsole.bind(this);
    this.onChangeHandlerCommand = this.onChangeHandlerCommand.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
   }

  onChangeHandlerConsole(event) {
    // const contentVal = event.target.value;
    this.setState({selectedConsole: event.target.value});
  }

  onChangeHandlerCommand(event) {
    // const contentVal = event.target.value;
    this.setState({selectedCommand: event.target.value});
  }

  onSubmitHandler(event){
    const eventVal = event.target.value;

  }

   render() {

    console.log(this.state);

    return (

     <div>
        <h1>Esports Advanced Stats</h1>
          <form action="/godinfo" method="get" onSubmit={this.onSumbitHandler}>
            <div>
              <ConsoleSelector consoles={consoles} onChangeHandlerConsole={this.onChangeHandlerConsole} />
            </div>
            <div>
              <CommandSelector commands={commands} onChangeHandlerCommand={this.onChangeHandlerCommand} />
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



