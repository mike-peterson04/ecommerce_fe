import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import RegForm from './RegForm/regForm';
import Navbar from './navbar/navbar'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVendor:false

        }
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

    render() {
        return (
            <div>
                <Navbar vendor={this.state.isVendor}/>
                <div className="container-fluid">
                    <div className = "reg-form-wrapper my-5">
                        <RegForm registerUser={(regUser) => this.registerUser(regUser)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;