import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import RegForm from './RegForm/regForm';
import LoginForm from './LoginForm/loginForm';
import ProductForm from './ProductForm/productForm';
import Navbar from './navbar/navbar'
import ShoppingCart from './ShoppingCart/shoppingCart';
import jwtDecode from 'jwt-decode';
import LogWrap from './logWrap/LogWrap';
import ProductViewer from './ProductViewer/productViewer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVendor:false,
            isLoggedIn:false,
            activeCategory:{id:0},
            user:{},
            customer:{},
            shoppingCart:[],
            productsInCart:[],
            renderIndex:"initial",
            products:[]
        }
    }

    componentDidMount(){
        const jwt = localStorage.getItem('token');
        this.getProducts()
        try{
            const user = jwtDecode(jwt);
            this.setState({user});
        } catch {}
    }

    productSearch = async(event)=>{
        event.preventDefault();
        let body = event.target.search.value+""
        console.log(body)
        let searchResult = await axios.get('https://localhost:44394/api/product/search/'+body);
        this.setState({products:searchResult.data})

    }

    // User password requires at least one digit 1-9!
    registerUser = async(userReg) => {
        console.log("passed reg param", userReg)
        try {
            let {data} = await axios.post('https://localhost:44394/api/authentication/', userReg);
            console.log('registered post', data);
        }
        catch(error){
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties.Try again later!`)
        }
    }

    getVendor = async (token) =>{
        
        let config = {headers: { Authorization: `Bearer ${token}` }}
        let vendor = await axios.get("https://localhost:44394/api/vendor/",config);
        console.log(vendor);
        if(vendor.data !== ""){
            let result = {
                isVendor:true,
                vendor:vendor.data
            }
            console.log(result)
            return result;
        }
        else{
            let result = {
                isVendor:false,
                vendor:'null'
            }
            return result;
        }

    }

    existingCustomer = async(token) =>{
    
        
        let config = {headers: { Authorization: `Bearer ${token}` }}
        let user = jwtDecode(token);
        user = user.id
        
        let url = "https://localhost:44394/api/customer/"+user;
        let customer
        let userInfo
        try{
            
            customer = await axios.get(url, config)
            

            
            if(customer.data === ""){

            
                userInfo = await axios.get("https://localhost:44394/api/examples/user", config)
                userInfo = userInfo.data;
                let packet = {
                    UserId:user,
                    FirstName:userInfo.firstName
                }
                customer = await axios.post("https://localhost:44394/api/customer/new_customer", packet, config);
            }
            }
            catch(e)
            {
                console.log(e, customer, userInfo)
            }
        customer = customer.data;
        let vendor = await this.getVendor(token);
        
            return({customer:customer,
            vendor:vendor.vendor,
            isVendor:vendor.isVendor
            });
    }

    purge = () =>{

    }

    wipeout = () =>{
        localStorage.removeItem("token")
        this.setState({
            isVendor:false,
            isLoggedIn:false,
            user:{},
            customer:{},
            ShoppingCart: [],
            productsInCart: []
        })
    }

    loginUser = async(userLogin) =>  {
        console.log("passed login param", userLogin)
        try{
            let {data} = await axios.post('https://localhost:44394/api/authentication/login/', userLogin);
            console.log('Logged in User', data);
            localStorage.setItem('token', data.token);
            const tokenFromStorage = localStorage.getItem('token');
            this.setState({
                isLoggedIn:true,
                user:jwtDecode(tokenFromStorage)
            });
            let customer = await this.existingCustomer(tokenFromStorage)
            // These three lines can move from here once routing is established I think.      

            this.setState(
                {shoppingCart: [],
                productsInCart: [],
                customer:customer.customer,
                vendor:customer.vendor,
                isVendor:customer.isVendor,
                isLoggedIn:true
            });
            this.getUserShoppingCart();
        }
        catch(error){
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`);
        }
    }

    getUserShoppingCart = async() => {
        let token = localStorage.getItem('token');
        let config = {headers: { Authorization: `Bearer ${token}` }}
        let {data} = await axios.get('https://localhost:44394/api/shoppingcart/' + this.state.user.id, config);
        console.log("shopping cart", data);
        this.setState({shoppingCart: data})
        this.getUserProducts(config, data);
    }

    getUserProducts = async(config, data) => {
        let items = data;
        for(let i = 0; i < items.length; i++){
            let {data} = await axios.get('https://localhost:44394/api/product/' + items[i].productId, config);
            this.setState({productsInCart:[...this.state.productsInCart, data]});
        }
    }

    removeFromCart = async(id) => {
        console.log("remove ", id);
        let token = localStorage.getItem('token');
        let config = {headers: { Authorization: `Bearer ${token}` }};
        let {data} = await axios.delete('https://localhost:44394/api/shoppingcart/' + id, config, {"id": id});
        this.removeItem(data);
    }

    removeItem(e) {
        e.user = null;
        this.setState({shoppingCart: this.state.shoppingCart.filter(function(item) { 
            return item !== e; 
        })});
    }

    getProducts = async() =>{
        let productReturn = [];
        let products;

        try{
            products = await axios.get('https://localhost:44394/api/product/')
            products = products.data;
            
            if (this.state.activeCategory.id !== 0){
                for(let i = 0;i<products.length;i++){
                    if(products[i].category === this.state.activeCategory){
                        productReturn.push(products[i])
                    }

                }
                if(productReturn.length === 0){
                    if(this.state.renderIndex === 'initial'){
                        this.State.renderIndex="default";
                    }
                    else{
                        alert("No products were found that matched your request, showing all products")
                    }
                    
                    
                }
            }
            productReturn = products
            console.log(products)
            this.setState({products:productReturn})

        }
        catch(e){
            console.log(e," ",products)

        }
    } 

    render() {
        if (!this.state.isLoggedIn){
            return(
                <div>
                    <Navbar productSearch={this.productSearch} vendor={this.state.isVendor} logout={() => this.wipeout()} isLoggedIn={this.state.isLoggedIn} login=""/>
                    <div className="container-fluid col-md-8">
                        <div className="row">
                            <div className="col-sm">
                            </div>
                            <div className = "col-sm reg-form-wrapper my-5">
                                <LogWrap registerUser={(regUser) => this.registerUser(regUser)} loginUser={(loginUser) => this.loginUser(loginUser)}/>
                            </div>
                            <div className="col-sm">
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
        return (
            <div>
                <Navbar productSearch={this.productSearch} vendor={this.state.isVendor} logout={() => this.wipeout()} isLoggedIn={this.state.isLoggedIn} login=""/>
                <div className="container-fluid col-md-8">
                    <div className="row">
                        <div className="col-sm">
                        </div>
                        <div className = "col-sm reg-form-wrapper my-5">
                            <ProductViewer products={this.state.products}/>
                        </div>
                        <div className="col-sm">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;