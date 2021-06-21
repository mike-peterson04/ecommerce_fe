  
import React from 'react';
import './productViewer.css';
import {Button} from 'react-bootstrap';



function ProductViewer(props){

    function ProductMapper(product){
        return(
        <div>
            <div ClassName="card">
            <div class="card-header">Featured</div>
            <div ClassName="card-body">
            <h5 ClassName="card-title">{product.name}</h5>
            <h6 ClassName="card-subtitle mb-2 text-muted">{product.price}</h6>
            <p ClassName="card-text">{product.description}</p>
            <Button ClassName="btn btn-primary" onClick={() => props.addToCart(product)}>Add to Cart</Button>
            <Button ClassName="btn btn-secondary" onClick={() => props.productDetails(product)}>Details</Button>
            <Button ClassName="btn reply-modal-btn" onClick={() => props.toggleModal(product)}>Add Review</Button>
            </div>
            <div class="card-footer text-muted">{product.category.name}</div>
            </div>
            <br />

        </div>
        );
    }
    return(props.products.map((product)=>ProductMapper(product)));
}
export default ProductViewer;