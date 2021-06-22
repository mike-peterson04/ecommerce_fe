import "./navbar.css";
import { Link } from 'react-router-dom';
import { render } from "@testing-library/react";
import './fontAwesome/css/all.min.css';

function Navbar(props){
    const logToggle = () => {
        if (props.isLoggedIn){
            return (<button className="btn btn-warning my-2 my-sm-0" onClick={() => props.logout()}>Logout</button>)
        } else{
            return (<button className="btn btn-warning my-2 my-sm-0">Login</button>)
            //return (<button className="btn btn-outline-success my-2 my-sm-0" onClick={() => props.login()}>Login</button>)
        }
    }

    const search = (e) => {

        props.searchTerm(e);
    }
    debugger;
    if(props.index=='search'){
        return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/#">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                            <li className="nav-item"><a href='' className='nav-link' onClick={(e)=>props.escape(e)}>Return to main page</a></li>
                            <form className="form-inline my-2 my-lg-0" onSubmit={(e)=>props.productSearch(e)}>
                                <input className="form-control mr-sm-2" name = "search" type="search" placeholder="Search" aria-label="Search"></input>

                                
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Search">Search</button>



                            </form>
                    </ul>
                    
                    
                    <div className="logoutLblPos">
                        {logToggle()}
                    </div>
                </div>
            </nav>)

    }

    else if(props.vendor){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/#">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link className="nav-link" to="/cart">
                            <li>Shopping Cart</li>
                        </Link>
                        <Link className="nav-link" to="/add">
                            <li>Add Product</li>
                        </Link>
                        <Link className="nav-link" to="/products">
                            <li>View all Products</li>
                        </Link>
                            <form className="form-inline my-2 my-lg-0" onSubmit={(e)=>props.productSearch(e)}>
                                <input className="form-control mr-sm-2" name = "search" type="search" placeholder="Search" aria-label="Search"></input>

                                
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Search">Search</button>



                            </form>
                        {/* <li className="nav-item active">
                            <a className="nav-link" href="/#" onClick="props.userCart()">Shopping Cart <span class="sr-only"></span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">My Products</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Product Categories(Broken)
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/#">Video Games</a>
                            <a className="dropdown-item" href="/#">Sports</a>
                                
                        </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/#">Disabled</a>
                        </li> */}

                    </ul>
                    
                    
                    <div className="logoutLblPos">
                        {logToggle()}
                    </div>
                </div>
            </nav>
            );
    }
    else{
        return(
            <nav className="navBar">
                <div className="logo">
                    <h3>Logo</h3>
                </div>
                <ul>
                    <li><a href="/#">product categories</a></li>
                    <li><a href="/#">register as vendor</a></li>
                    <li><a href="/#"><i class="fas fa-shopping-cart fa-2x"></i></a></li>
                    <li>{logToggle()}</li>
                </ul>
            </nav>
            // <nav className="navbar navbar-expand-lg navbar-light bg-light">
            //     <a className="navbar-brand" href="/#">Home</a>
            //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            //         <span className="navbar-toggler-icon"></span>
            //     </button>
            //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
            //         <ul className="navbar-nav mr-auto">
            //             <li className="nav-item">
            //                 <a className="nav-link" href="/#">Shopping Cart <span className="sr-only"></span></a>
            //             </li>
                        
            //             <li className="nav-item dropdown">
            //                 <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //                 Product Categories(Broken)
            //                 </a>
            //                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            //                 <a className="dropdown-item" href="/#">Video Games</a>
            //                 <a className="dropdown-item" href="/#">Sports</a>
                                
            //             </div>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link" href="/#">Register as Vendor</a>
            //             </li>
                        
            //         </ul>
                    
            //         <form className="form-inline my-2 my-lg-0" onSubmit={(e)=>props.productSearch(e)}>
            //             <input className="form-control mr-sm-2" name = "search" type="search" placeholder="Search" aria-label="Search"></input>
            //             <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Search">Search</button>
            //         </form>
            //         <div className="logoutLblPos">
            //             {logToggle()}
            //         </div>
            //     </div>
            // </nav>
            );
    }

    
}
export default Navbar;