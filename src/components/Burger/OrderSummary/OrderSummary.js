import React, {Component,Fragment} from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	
	//this could be a functional component

	render(){
		const ingredientSummary = Object.keys(this.props.ingredients).map(
		igkey => {
			return(
				<li key={igkey}>
					<span style={{textTransform:'capitalize'}}>{igkey}: {this.props.ingredients[igkey]}</span>
				</li>
				)
		}
		);
		return(
			<Fragment>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients: </p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price : {this.props.price.toFixed(2)}€</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType = "Danger" clicked = {this.props.purchaseCancelled}>CANCEL</Button>
				<Button btnType = "Success" clicked ={this.props.purchaseContinued} >CONTINUE</Button>
				
		</Fragment>
		);
	}
}	
export default OrderSummary;