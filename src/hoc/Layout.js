import React, {Component,Fragment} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
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
				open={this.state.showSideDrawer}
			 	closed={this.SideDrawerClosedHandler}/>
			<Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
			<main className={classes.Content}>
				{this.props.children}
			</main>
		</Fragment>
			);
	}
}

export default Layout;
