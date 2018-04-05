import React, { Component,Fragment } from 'react';
import {connect} from 'react-redux'

import Modal from  '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';




export class BurgerBuilder extends Component {
	state = {
		purchasing  : false,
	}

	componentDidMount (){
		this.props.onInitIngredients()
		
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients).map(igKey=>{
			return ingredients[igKey]
		}).reduce((acc,el)=>{
			return acc+el
		},0);
		return sum > 0
	}
	

	purchaseHandler = () => {
		if(this.props.isAuthenticate){
			this.setState({purchasing:true});
		}
		else {
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
	}
	purchaseCancelHandler = () =>{
		this.setState({purchasing:false});
	}
	purchaseContinueHandler	= () =>{
		this.props.history.push('/checkout');
		// alert('You Continue')
		
		// const queryParams = [];
		// for(let i in this.state.ingredients){
		// 	queryParams.push(encodeURIComponent(i)+ '=' +encodeURIComponent(this.state.ingredients[i]))
		// }
		// queryParams.push('price='+this.state.totalPrice);
		// const queryString = queryParams.join('&')
		// this.props.history.push({
		// 	pathname:'/checkout',
		// 	search : '?' + queryString
		// })
	}

	render(){

		const disabledInfo = {
				...this.props.ings
		};

		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
		

		
		let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner/>

		if(this.props.ings){
			burger = (
					<Fragment>
						<Burger ingredients = {this.props.ings}/>
						<BuildControls
						ingredientRremoved ={this.props.onIngredientRemoved}
						ingredientAdded={this.props.onIngredientAdded}
						price = {this.props.price}
						disabled = {disabledInfo}
						purchasable = {this.updatePurchaseState(this.props.ings)}
						ordered= {this.purchaseHandler}
						isAuth= {this.props.isAuthenticate}/>
					</Fragment>
					);
			orderSummary = <OrderSummary
					 price = {this.props.price}
					 purchaseCancelled = {this.purchaseCancelHandler}
					 purchaseContinued = {this.purchaseContinueHandler}
					 ingredients = {this.props.ings}/>
		}

		// if(this.state.loading){
		// 	orderSummary = <Spinner/>
		// }
		

		
					

		return(
			<Fragment>
				<Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<div></div>
				<div>
					{burger}
				</div>
			</Fragment>
			);

	}

}

const mapStateToProps = state =>{
	return{
		ings : state.burgerBuilder.ingredients,
		price:state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticate : state.auth.token !== null,
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onIngredientAdded : (ingName)=> dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved : (ingName)=> dispatch(actions.removeIngredient(ingName)),
		onInitIngredients : () => dispatch(actions.initIngredients()),
		onInitPurchase : () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath : (path) => dispatch(actions.sethAuthRedirectPath(path))

	}

}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));