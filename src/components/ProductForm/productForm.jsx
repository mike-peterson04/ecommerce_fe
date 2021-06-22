import React from 'react';
import useCustomForm from '../CustomHooks/useCustomForm';
import './productForm.css';

const ProductForm = (props) => {

    const Submittal = () => {
        const newProduct = {
            Name: inputs.name,
            Price: parseFloat(inputs.price),
            description: inputs.description,
            CategoryId: parseInt(inputs.category),
            vendorId: props.vendorId
        }
        console.log(newProduct, "added"); 
        props.registerProduct(newProduct);
    }

    const {inputs, handleChange, handleSubmit} = useCustomForm(Submittal);

    return(
        <div className="product-form my-3">
            <h4>New Product</h4>
            <form onSubmit={handleSubmit}>
            <div className="form-group d-flex flex-column">
                <label htmlFor="name">Name:</label>
                <input className="form-rounded form-control" type="text" name="name" value={inputs.name} onChange={handleChange} spellCheck="false"/>

                <label htmlFor="price">Price:</label>
                <input className="form-rounded form-control" type="text" name="price" value={inputs.price} onChange={handleChange} spellCheck="false"/>

                <label htmlFor="description">Description:</label>
                <input className="form-rounded form-control" type="text" name="description" value={inputs.description} onChange={handleChange} spellCheck="false"/>

                <label htmlFor="category">Category:</label>
                <input className="form-rounded form-control" type="text" name="category" value={inputs.category} onChange={handleChange} spellCheck="false"/>
                <br/>
                <button className="btn btn-primary">New Product</button>
            </div>
            </form>
        </div>

    )
}

export default ProductForm;