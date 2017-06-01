'use strict';
import React from 'react';
import Selector from '../components/Selector';
import Input from '../components/Input';
import {connect} from 'react-redux';
import {systems} from '../constants';
import {fetchAPIRequestMethods, fetchAPIRequest} from '../action-creators/apiRequests';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
  return {
    apiRequestMethods: state.apiInfo.defaultMethodData
  };
};

const mapDispatchToProps = dispatch => {

  return {
      fetchingAPIRequestMethods() {
        dispatch(fetchAPIRequestMethods());
      },

      fetchingAPIRequest(localStateObj, queryObj) {
        dispatch(fetchAPIRequest(localStateObj, queryObj));
      }

    };

};

class Admin extends React.Component  {
   constructor(props){
    super(props);
    this.state = {system: 'Xbox', method: 'getgods'};
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
   }

  onChangeHandler(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmitHandler(event){
    event.preventDefault();
    // call a function with my current local state
    // let paramArr = this.props.apiRequestMethods[this.state.method];

    console.log('getting here', this.state, this.props.apiRequestMethods[this.state.method]);
    this.props.fetchingAPIRequest(this.state, this.props.apiRequestMethods[this.state.method]);
    // const eventVal = event.target.value;

  }

  componentWillMount(){
   if (!this.props.apiRequestMethods) this.props.fetchingAPIRequestMethods();
  }
   render() {

    let methodArr = this.props.apiRequestMethods ? Object.keys(this.props.apiRequestMethods) : [];
       // if (event.target.name === 'method' && this.props.apiRequestMethods.format.length > 1)
    // console.log('apiRequestMethodsObj', this.props.apiRequestMethods);
    // console.log(this.state);

    return (

     <div>
        <h1>Esports Advanced Stats Admin API Requests</h1>
          <form onSubmit={this.onSubmitHandler}>
            <div>
              <Selector dataArr={systems} name={'system'} onChangeHandler={this.onChangeHandler} />
            </div>
            <div>
               <Selector dataArr={methodArr} name={'method'} onChangeHandler={this.onChangeHandler} />
            </div>
            <div>
               {this.props.apiRequestMethods && this.props.apiRequestMethods[this.state.method].format.map(formatType =>
                  <Input key={formatType} name={formatType} onChangeHandler={this.onChangeHandler} />)
               }
            </div>
            <button type="submit" id="search">Find Data!</button>
          </form>

        </div>

    );

   }

}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
export default connect(mapStateToProps, mapDispatchToProps)(Admin);

