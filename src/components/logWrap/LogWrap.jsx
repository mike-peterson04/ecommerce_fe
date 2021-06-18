import React, {Component} from 'react';
import LoginForm from '../LoginForm/loginForm';
import RegForm from '../RegForm/regForm';

class LogWrap extends Component{
    constructor(props){
        super(props);
        this.state = {
            render:"decide"
        }
    }
    registerStart = () =>{
        this.setState({render:"register"})
    }
    loginStart = () =>{
        this.setState({render:"login"})
    }
    
    render(){
        if(this.state.render === "decide"){
            return (
                <div>
                            <button className="btn btn-success" onClick={this.registerStart}>Register</button> 
                            <button className="btn btn-success"onClick={this.loginStart}>Login!</button>
        
                </div>
            );
        }
        else if(this.state.render === "register"){
            return (
                <div>
                            <RegForm registerUser={(regUser) => this.props.registerUser(regUser)}/>
        
                </div>
            );
        }
        else{
            return (
                <div>
                            
                            <LoginForm loginUser={(loginUser) => this.props.loginUser(loginUser)}/>
        
                </div>
            );
        }
    }
}
export default LogWrap;
