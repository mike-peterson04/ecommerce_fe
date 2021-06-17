import React from 'react';
import useCustomForm from '../CustomHooks/useCustomForm';
import './shoppingCart.css';


const ShoppingCart = (props) => {
    
    console.log(props.user);

    return (
        <div>
            <h1>{props.user.username}'s Shopping Cart.</h1>
        </div>
    )
}

export default ShoppingCart;