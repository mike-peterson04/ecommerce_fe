import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import RegForm from './RegForm/regForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className = "reg-form-wrapper my-5">
                    <RegForm />
                </div>
            </div>
        )
    }
}

export default App;