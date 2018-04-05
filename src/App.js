import React, { Component } from 'react';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';



import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(()=>(
  import('./containers/Checkout/Checkout').then(module=>module.default)
))
const asyncOrder = asyncComponent(()=>(
  import('./containers/Orders/Orders').then(module=>module.default)
))

const asyncAuth= asyncComponent(()=>(
  import('./containers/Auth/Auth').then(module=>module.default)
))

class App extends Component {
  componentDidMount (){
    this.props.onTryAutoSignup();
  }
  render() {
    let router = (
        <Switch>
          <Route path='/auth' component = {asyncAuth}/>
          <Route path='/' exact component = {BurgerBuilder}/>
          <Redirect to = '/'/>
        </Switch>  
      );
    if(this.props.isAuthenticated){
        router = (
          <Switch>
          <Route path='/checkout' component = {asyncCheckout}/>
          <Route path='/orders' component = {asyncOrder}/>
          <Route path='/auth' component = {asyncAuth}/>
          <Route path='/logout' component = {Logout}/>
          <Route path='/' exact component = {BurgerBuilder}/>
          <Redirect to = '/'/>
          </Switch>
          )
    }
    return (
      <div>
      <Layout>
	       {router}	
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
    return{
      isAuthenticated : state.auth.token !==null
    }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect( mapStateToProps,mapDispatchToProps)(App));
