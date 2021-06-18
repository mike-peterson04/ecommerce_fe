import React from 'react';
//import useCustomForm from '../CustomHooks/useCustomForm';
import './shoppingCart.css';


const ShoppingCart = (props) => {
    console.log(props.items)
    
    const setQuantity = (id) => {
        for(let i = 0; i < props.cart.length; i++){
            if (props.cart[i].productId === id){
                return props.cart[i].quantity;
            }
            console.log("HERE", props.cart[i]);
        }
    }

    return (
        <div>
            <h1>{props.user.username}'s Shopping Cart.</h1>
            {props.items.map((item) => 
                <div>
                    <p>Product Name: {item.name}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {setQuantity(item.id)}</p>
                    <button onClick={() => props.removeFromCart(item.id)}>Remove from Cart</button>
                </div>
            )}
        </div>
    )
}

export default ShoppingCart;