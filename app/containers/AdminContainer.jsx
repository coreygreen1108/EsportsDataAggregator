'use strict';
import React from 'react';
import Selector from '../components/Selector';
import Input from '../components/Input';
import {connect} from 'react-redux';
import {systems} from '../constants';
import {fetchAPIRequestMethods, fetchAPIRequest} from '../action-creators/apiRequests';

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
      fetchingAPIRequest(localStateObj, formatObj) {
        dispatch(fetchAPIRequest(localStateObj, formatObj));
      }
    };
};

class Admin extends React.Component {
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
    this.props.fetchingAPIRequest(this.state, this.props.apiRequestMethods[this.state.method]);
  }

  componentWillMount(){
   if (!this.props.apiRequestMethods) this.props.fetchingAPIRequestMethods();
  }

  render() {

    let methodArr = this.props.apiRequestMethods ? Object.keys(this.props.apiRequestMethods) : [];

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
                  <Input key={formatType} name={formatType} onChangeHandler={this.onChangeHandler} value={this.state[formatType] || ''} />)
               }
            </div>
            <button type="submit" id="search">Find Data!</button>
          </form>

        </div>

    );

   }

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

