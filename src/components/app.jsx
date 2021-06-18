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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVendor:false,
            isLoggedIn:false,
            user:{},
            customer:{},
        }
    }

    componentDidMount(){
        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            this.setState({user});
        } catch {}
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

    existingCustomer = async(token) =>{
        debugger;
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
        this.setState({customer:customer});




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
        })
    }

    loginUser = async(userLogin) =>  {
        console.log("passed login param", userLogin)
        try{
            let {data} = await axios.post('https://localhost:44394/api/authentication/login/', userLogin);
            console.log('Logged in User', data);
            localStorage.setItem('token', data.token);
            // These two lines are for reference and can be removed later
            const tokenFromStorage = localStorage.getItem('token');
            this.setState({
                isLoggedIn:true,
                user:jwtDecode(tokenFromStorage)
            });
            this.existingCustomer(tokenFromStorage)
            console.log(tokenFromStorage);
        }
        catch(error){
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`);
        }
    }

    render() {
        
        return (
            <div>
                <Navbar vendor={this.state.isVendor}/>
                <div className="container-fluid col-md-8">
                    <div className="row">
                        <div className="col-sm">
                        </div>
                        <div className = "col-sm reg-form-wrapper my-5">
                            <RegForm registerUser={(regUser) => this.registerUser(regUser)}/>
                            <LoginForm loginUser={(loginUser) => this.loginUser(loginUser)}/>
                            <ProductForm />
                            <ShoppingCart token={localStorage.token} user={this.state.user}/>
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