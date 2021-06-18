function ProductViewer(props){

    function ProductMapper(product){
        return(
        <div>
            <table>
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
                        <button className="btn btn-success" value="Add To Cart"/>
                        </td>
                        <td>
                        <button className="btn btn-success" value="See Reviews"/>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        );
    }
    return(props.products.map((product)=>ProductMapper(product)));
}
export default ProductViewer;