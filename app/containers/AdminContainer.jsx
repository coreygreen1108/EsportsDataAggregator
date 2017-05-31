'use strict';
import React from 'react';
import Selector from '../components/Selector';
import {connect} from 'react-redux';
import {systems, commands} from '../constants';
import {fetchAPIRequests} from '../action-creators/apiRequests';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
  return {
    apiRequestMethods: state.apiInfo.defaultMethodData
  };
};

const mapDispatchToProps = dispatch => {

  return {
      fetchingAPIRequests() {
        dispatch(fetchAPIRequests());
      }
    };

};

class Admin extends React.Component  {
   constructor(props){
    super(props);
    this.state = {system: 'Xbox', method: 'getgodranks', target: ''};
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
   }

  onChangeHandler(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmitHandler(event){
    const eventVal = event.target.value;

  }

  componentWillMount(){
   if (!this.props.apiRequestMethods) this.props.fetchingAPIRequests();
  }
   render() {

    console.log('props', this.props);

    return (

     <div>
        <h1>Esports Advanced Stats Admin API Requests</h1>
          <form action="/godinfo" method="get" onSubmit={this.onSumbitHandler}>
            <div>
              <Selector dataArr={systems} name={'system'} onChangeHandler={this.onChangeHandler} />
            </div>
            <div>
               <Selector dataArr={commands} name={'method'} onChangeHandler={this.onChangeHandler} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
// export default connect(mapStateToProps, mapDispatchToProps)(Admin);

