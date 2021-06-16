import React from 'react';
import useCustomForm from '../CustomHooks/useCustomForm';
import './regForm.css';
// import axios from 'axios';

const RegForm = (props) => {

    const Submittal = () => {
        console.log(); 
    }

    const {inputs, handleChange, handleSubmit} = useCustomForm(Submittal);

    return (
        <div className="form">
            <form onSubmit = {handleSubmit} >
                <div className="form-group d-flex flex-column">
                    <label htmlFor="firstName">First Name: </label>
                    <input className="form-rounded" type="text" name="firstName" onChange={handleChange} value={inputs.firstName} spellcheck="false"/>

                    <label htmlFor="lastName">Last Name: </label>
                    <input className="form-rounded" type="text" name="lastName" onChange={handleChange} value={inputs.lastName} spellcheck="false"/>

                    <label htmlFor="userName">Username: </label>
                    <input className="form-rounded" type="text" name="userName" onChange={handleChange} value={inputs.userName} spellcheck="false"/>

                    <label htmlFor="password">Password: </label>
                    <input className="form-rounded" type="text" name="password" onChange={handleChange} value={inputs.password} spellcheck="false"/>

                    <label htmlFor="email">Email: </label>
                    <input className="form-rounded" type="text" name="email" onChange={handleChange} value={inputs.email} spellcheck="false"/>

                    <label htmlFor="phoneNumber">Phone Number: </label>
                    <input className="form-rounded" type="text" name="phoneNumber" onChange={handleChange} value={inputs.phoneNumber} spellcheck="false"/>
                    <br/>
                    <button className="btn btn-success" type="submit">Sign Up!</button>
                </div>
            </form>
        </div>
    )
}

export default RegForm;