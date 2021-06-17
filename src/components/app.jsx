import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import RegForm from './RegForm/regForm';
import LoginForm from './LoginForm/loginForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

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

    loginUser = async(userLogin) =>  {
        console.log("passed login param", userLogin)
        try{
            let {data} = await axios.post('https://localhost:44394/api/authentication/login/', userLogin);
            console.log('Logged in User', data);
            localStorage.setItem('token', data.token);
            // These two lines are for reference and can be removed later
            const tokenFromStorage = localStorage.getItem('token');
            console.log(tokenFromStorage);
        }
        catch(error){
            alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className = "reg-form-wrapper my-5">
                    <RegForm registerUser={(regUser) => this.registerUser(regUser)}/>
                    <LoginForm loginUser={(loginUser) => this.loginUser(loginUser)}/>
                </div>
            </div>
        )
    }
}

export default App;