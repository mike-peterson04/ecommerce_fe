import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import Navbar from './navbar/navbar'
import ShoppingCart from './ShoppingCart/shoppingCart';
import jwtDecode from 'jwt-decode';
import LogWrap from './logWrap/LogWrap';
import ProductViewer from './ProductViewer/productViewer';
import ReviewModal from './ReviewModal/reviewModal';
import DetailsModal from './DetailsModal/detailsModal';
import ProductForm from './ProductForm/productForm';
import { Route, Switch } from 'react-router-dom';


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
            products:[],
            currentProduct:{},
            reviewModalState:false,
            detailsModalState:false,
            categories:[],
            reviews:[],
            averageRating: 0
        }
    }

    componentDidMount(){
        const jwt = localStorage.getItem('token');
        this.getProducts();
        this.getCategories();
        try{
            const user = jwtDecode(jwt);
            this.setState({user});
        } catch {}
    }

    getCategories = async () => {
        let categoriesReturn = [];
        let categories;
        try{
            categories = await axios.get('https://localhost:44394/api/categories/')
            categories = categories.data;
            categoriesReturn = categories;
            console.log(categories)
            this.setState({categories:categoriesReturn})

        }
        catch(e){
            console.log(e," ", categories)
        }
    }
    registerProduct = async (product) =>{
        debugger;
        let token = localStorage.getItem('token');
        let config = {headers: { Authorization: `Bearer ${token}` }};
        let result;
        try{
            result = await axios.post('https://localhost:44394/api/product/new',product,config);

        }
        catch(e){
            console.log(e);
        }

    }

    getReviews = async () => {
        let reviewsReturn = [];
        let reviews;
        try{
            reviews = await axios.get('https://localhost:44394/api/review/' + this.state.currentProduct.id)
            reviews = reviews.data;
            reviewsReturn = reviews;
            this.setState({reviews:reviewsReturn}, () => this.getAverageRating());
        }
        catch(e){
            console.log(e, " ". reviews);
        }
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
        }
        catch(error){
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`);
        }
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

    toggleReviewModal = (product) => {
        if (product.id){
            this.setState({currentProduct: product})
        }
        this.setState({reviewModalState: !this.state.reviewModalState});
    }

    getAverageRating = () => {
        let total = 0;
        for(let i = 0; i < this.state.reviews.length; i++){
            total += this.state.reviews[i].starRating;
        }
        total = total/this.state.reviews.length;
        this.setState({averageRating: total});
        console.log(total)
    }

    toggleDetailsModal = (product) => {
        if (product.id != this.state.currentProduct.id){
            this.setState({currentProduct: product}, () => {this.getReviews()})
            this.setState({activeCategory: product.categoryId})
        }
        this.setState({detailsModalState: !this.state.detailsModalState})
    }

    addToCart = async (product) => {
        console.log("Old",product);
        let newProduct = {
            ProductId: product.id,
            CustomerId: this.state.customer.id,
            Quantity: 1
        }
        console.log("new", newProduct)
        try{
            let token = localStorage.getItem('token');
            let config = {headers: { Authorization: `Bearer ${token}` }};
            let result = await axios.post("https://localhost:44394/api/shoppingcart/add", newProduct, config)
        }
        catch(e){
            console.log(e);
        }
        this.setState({detailsModalState: false});
        this.setState({reviewModalState: false});
    }


    render() {
        if (!this.state.isLoggedIn){
            return(
                <div className="container-fluid">
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
            <div className="container-fluid">
                <Navbar productSearch={this.productSearch} vendor={this.state.isVendor} logout={() => this.wipeout()} isLoggedIn={this.state.isLoggedIn} login=""/>
                
                <div className="container-fluid col-md-8">
                    <div className="row">
                        <div className="col-sm">
                        {/* {this.state.isVendor&&<ProductForm vendorId={this.state.vendor.id} registerProduct={this.registerProduct}/>} */}
                        </div>
                        <div className = "col-sm reg-form-wrapper my-5">
                            <Switch>
                                <Route
                                    path='/home'
                                    render={(props) => (
                                        <ProductViewer products={this.state.products} addToCart={(product) => this.addToCart(product)} product={this.state.currentProduct} productDetails={(product) => this.toggleDetailsModal(product)} toggleModal={(product) => this.toggleReviewModal(product)} isAuthed={true} />
                                    )}
                                />
                                <Route
                                    path='/cart'
                                    render={(props) => (
                                        <ShoppingCart user={this.state.user} isAuthed={true} />
                                    )}
                                />
                                <Route
                                    path='/add'
                                    render={(props) => (
                                        <ProductForm vendorId={this.state.vendor.id} registerProduct={this.registerProduct} isAuthed={true} />
                                    )}
                                />
                                <Route
                                    path='/products'
                                    render={(props) => (
                                        <ProductViewer products={this.state.products} addToCart={(product) => this.addToCart(product)} product={this.state.currentProduct} productDetails={(product) => this.toggleDetailsModal(product)} toggleModal={(product) => this.toggleReviewModal(product)} isAuthed={true} />
                                    )}
                                />
                            </Switch>
                            <ReviewModal product={this.state.currentProduct} toggleModal={(product) => this.toggleReviewModal(product)} modalState={this.state.reviewModalState}/>
                            <DetailsModal rating={this.state.averageRating} category={this.state.activeCategory} reviews={this.state.reviews} product={this.state.currentProduct} addToCart={(product) => this.addToCart(product)} toggleModal={(product) => this.toggleDetailsModal(product)} modalState={this.state.detailsModalState} addToCart={(item) => this.addToCart(item)}/>
                        </div>
                        {/* <div className="col-sm">
                            <ShoppingCart user={this.state.user}/>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;