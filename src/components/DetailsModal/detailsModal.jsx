import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';



function DetailsModal(props){

    // const [reviewText, setReviewText] = useState("");
    // const [modalState, setModalState] = useState(props.modalState);
    const toggleModal = () => {
        props.toggleModal(props.product);
    };
    let product = props.product;

    return(
        <div>
            <Modal scrollable={true} show={props.modalState} onHide={() => toggleModal}>
                <Modal.Header><h1>{product.name}</h1></Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                                <div className="row">
                                    <h3>Description</h3>
                                    <h5>{product.description}</h5>
                                </div>
                                <br />
                                <div className="row">
                                    <h3>Price</h3>
                                    <h5>{product.price}</h5>
                                </div>
                                <br />
                                <div className="row">
                                    <h3>Category</h3>
                                    <h5>Category</h5>
                                </div>
                                <br />
                                <div className="row">
                                    <h3>Rating</h3>
                                    <h5>{props.rating}</h5>
                                </div>
                                <br />
                                <div className="row">
                                    <h3>Reviews</h3>
                                    {props.reviews.map((review) => 
                                        <div className="row">
                                            <h6>{review.starRating}</h6>
                                            <p>{review.review_Body}</p>
                                        </div>
                                    )}
                                </div>                                
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="reply-modal-button">
                        <Button onClick={() => props.addToCart(product)}>Add to Cart</Button>
                        <Button onClick={() => toggleModal(product)}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }

export default DetailsModal;