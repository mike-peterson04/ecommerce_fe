import React from 'react';
//import useCustomForm from '../CustomHooks/useCustomForm';
import './shoppingCart.css';


const ShoppingCart = (props) => {
    console.log(props.items)
    
    return (
        <div>
            <h1>{props.user.username}'s Shopping Cart.</h1>
            {props.items.map((item) => 
                <div>
                    <p>Product Name: {item.name}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            )}
        </div>
    )
}

export default ShoppingCart;