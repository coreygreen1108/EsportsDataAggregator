'use strict';
import React from 'react';
import Selector from '../components/Selector';
import {connect} from 'react-redux';
import {systems, commands} from '../constants';
import {receiveingCommand} from '../action-creators/command';

const mapStateToProps = state => {
  return {
    selectedCommand: state.command.selectedCommand
  };
};

const mapDispatchToProps = dispatch => {

  return {
      receiveingCommand(selectedCommand) {
        dispatch(receiveingCommand(selectedCommand));
      }
    };

};

class App extends React.Component  {
   constructor(props){
    super(props);
    this.state = {system: 'PC', command: 'getgodranks', target: ''};
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
   }

  onChangeHandler(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmitHandler(event){
    const eventVal = event.target.value;

  }

   render() {

    return (

     <div>
        <h1>Esports Advanced Stats</h1>
          <form action="/godinfo" method="get" onSubmit={this.onSumbitHandler}>
            <div>
              <Selector dataArr={systems} name={'system'} onChangeHandler={this.onChangeHandler} />
            </div>
            <div>
               <Selector dataArr={commands} name={'command'} onChangeHandler={this.onChangeHandler} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

