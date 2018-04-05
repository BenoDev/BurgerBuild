import React, {Component,Fragment} from 'react';
import {connect} from 'react-redux'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
	state ={
		showSideDrawer : false
	}
	SideDrawerClosedHandler = () =>{
		this.setState({showSideDrawer:false})
	}
	SideDrawerToggleHandler =()=>{
		this.setState((prevState)=>{
			return {showSideDrawer:!prevState.showSideDrawer}
		})
	}

	render(){
		return(
		<Fragment>
			<SideDrawer
				isAuth = {this.props.isAuthenticate}
				open={this.state.showSideDrawer}
			 	closed={this.SideDrawerClosedHandler}/>
			<Toolbar
			 isAuth = {this.props.isAuthenticate}
			 drawerToggleClicked={this.SideDrawerToggleHandler}/>
			<main className={classes.Content}>
				{this.props.children}
			</main>
		</Fragment>
			);
	}
}

const mapStateToProps = state =>{
	return {
		isAuthenticate : state.auth.token !== null,
	}
}

export default connect(mapStateToProps,null)(Layout);
