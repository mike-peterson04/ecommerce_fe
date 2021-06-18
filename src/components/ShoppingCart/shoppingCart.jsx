import React from 'react';
//import useCustomForm from '../CustomHooks/useCustomForm';
import './shoppingCart.css';


const ShoppingCart = (props) => {
    
    return (
        <div>
            <h1>{props.user.username}'s Shopping Cart.</h1>
            {props.items.map((item) => 
                <div>
                    <p>ID: {item.productId}</p>
                </div>
            )}
        </div>
    )
}

export default ShoppingCart;