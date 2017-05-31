'use strict';
import React from 'react';
import Selector from '../components/Selector';
import Admin from './AdminContainer';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {systems, commands} from '../constants';
import {receiveingCommand} from '../action-creators/command';

 const App = (props) => (
   <Router >
      <div>
        <Route exact path="/" component={Admin} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  );

export default App;

// const App = (props) => (
//   <div className="App container-fluid">
//     <div className="App-reddit-selector">
//       <Link to="/">Front</Link> - <Link to="/r/all">All</Link> |
//       <DefaultRedditsContainer />
//     </div>
//     <div className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <strong>Reactit!</strong> An Example ReactJs Reddit front-end
//     </div>
//     {props.children}
//   </div>
// );


 // Router >
 //      <div>
 //        <Route exact path="/" component={App} />
 //        <Route path="/admin" component={Admin} />
 //      </div>
 //    </Router>

  // <div id="main">
   //   <Admin />
  //  </div>




// class App extends React.Component  {
//    constructor(props){
//     super(props);
//     this.state = {system: 'PC', command: 'getgodranks', target: ''};
//     this.onChangeHandler = this.onChangeHandler.bind(this);
//     this.onSubmitHandler = this.onSubmitHandler.bind(this);
//    }

//   onChangeHandler(event) {
//     this.setState({[event.target.name]: event.target.value});
//   }

//   onSubmitHandler(event){
//     const eventVal = event.target.value;

//   }

//    render() {

//     return (

//      <div>
//         <h1>Esports Advanced Stats</h1>
//           <form action="/godinfo" method="get" onSubmit={this.onSumbitHandler}>
//             <div>
//               <Selector dataArr={systems} name={'system'} onChangeHandler={this.onChangeHandler} />
//             </div>
//             <div>
//                <Selector dataArr={commands} name={'command'} onChangeHandler={this.onChangeHandler} />
//             </div>
//             <div>
//               <input id="target" type="text" name="target" placeholder="Enter Player Target" />
//             </div>
//             <button type="button" id="search">Find Data!</button>
//           </form>

//         </div>

//     );

//    }

// }


