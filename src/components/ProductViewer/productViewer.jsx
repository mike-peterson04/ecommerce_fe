import React from 'react';
import './productViewer.css';


function ProductViewer(props){
    function ProductMapper(product){
        return(
        <div>
            {/* <table ClassName='table table-striped'>
                <tbody>
                    <tr>
                        <td>
                            {product.name}
                        </td>
                        <td>
                            {product.price}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <button ClassName="btn btn-success" value="Add To Cart">Add To Cart</button>
                        </td>
                        <td>
                        <button ClassName="btn btn-success" value="See Reviews">See Reviews</button>
                        </td>
                    </tr>
                </tbody>
            </table> */}
            <div ClassName="card">
            <div class="card-header">Featured</div>
                <div ClassName="card-body">
                    <h5 ClassName="card-title">{product.name}</h5>
                    <h6 ClassName="card-subtitle mb-2 text-muted">{product.price}</h6>
                    <p ClassName="card-text">{product.description}</p>
                    <button ClassName="btn btn-primary">Add to Cart</button>
                    <button ClassName="btn btn-secondary">See Reviews</button>
                </div>
                <div class="card-footer text-muted">{product.category}</div>
            </div>
            <br />

        </div>
        );
    }
    return(props.products.map((product)=>ProductMapper(product)));
}
export default ProductViewer;