import React, {Component} from 'react';
//import useCustomForm from '../CustomHooks/useCustomForm';
import './shoppingCart.css';
import axios from 'axios';


class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:props.user,
            cart:[],
            purge:false
        }

    }
    purge(){
        this.setState({
            user:this.state.user,
            cart:[],
            purge:true
        })
        let cart = this.getCart();
        console.log(cart)

    }

    async removeItem(event,item){
        event.preventDefault();
        let token = localStorage.getItem('token');
        let config = {headers: { Authorization: `Bearer ${token}` }};
        this.state.cart = []
        try{
            let del = await axios.delete("https://localhost:44394/api/shoppingcart/"+item.productId,config)
            console.log(del);
        }
        catch(e){
            console.log(e)
        }

        this.getCart()

    }

    getCart = async() => {
        let cart;
        let token = localStorage.getItem('token');
        let config = {headers: { Authorization: `Bearer ${token}` }};
        try{
        cart = await axios.get("https://localhost:44394/api/shoppingcart/",config)
        this.setState({cart:cart.data});
        }
        catch(e){
            console.log(e);
        }
        return cart.data;
    }
    componentDidMount(){
        this.getCart();
    }
    cartmapper(item){
        let price = item.product.price*item.quantity;

        return(<div>
            <table className='table table-striped'>
                <tbody>
                    <tr>
                        <td>
                        Product Name: {item.product.name}
                        </td>
                        <td>
                            In Cart: {item.quantity}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total Price: {price}
                        </td>
                        <td>
                            Price per item: {item.product.price}
                        </td>
                    </tr>
                    <td colspan='2'>
                        <button className='btn btn-primary' onClick={(e)=>{this.removeItem(e,item)}}>Remove from cart</button>
                    </td>
                </tbody>
            </table>
        </div>)
    }
    render(){
        if(this.state.purge){
            let cart = this.getCart();
            this.state.purge = false;
        }
        console.log(this.state.cart)
        if(this.state.cart.length > 0){
            return(
                <div>
                    <h1>{this.state.user.username}'s Shopping Cart.</h1>
                    {this.state.cart.map((item)=>this.cartmapper(item))}
    
                </div>
                )
        }
        else{
            return('null')
        }

        
    }
}

// const ShoppingCart = (props) => {
//     console.log(props.items)
    
//     const setQuantity = (id) => {
//         for(let i = 0; i < props.cart.length; i++){
//             if (props.cart[i].productId === id){
//                 return props.cart[i].quantity;
//             }
//             console.log("HERE", props.cart[i]);
//         }
//     }

//     return (
//         <div>
//             <h1>{props.user.username}'s Shopping Cart.</h1>
//             {props.items.map((item) => 
//                 <div>
//                     <p>Product Name: {item.name}</p>
//                     <p>Price: {item.price}</p>
//                     <p>Quantity: {setQuantity(item.id)}</p>
//                     <button onClick={() => props.removeFromCart(item.id)}>Remove from Cart</button>
//                 </div>
//             )}
//         </div>
//     )
// }

export default ShoppingCart;