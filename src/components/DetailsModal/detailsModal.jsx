import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';



function DetailsModal(props){

    const [reviewText, setReviewText] = useState("");
    const [modalState, setModalState] = useState(props.modalState);
    const toggleModal = () => {
        props.toggleModal(props.product);
    };
    let product = props.product;

    return(
        <div>
            <Modal show={props.modalState} onHide={() => toggleModal}>
                <Modal.Header>{product.name}</Modal.Header>
                <Modal.Body>
                <div class="modal-content">
                    <div className="container-fluid">
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
                            <h3>Reviews</h3>
                            <h5>reviews</h5>
                        </div>
                        <br />
                        <div className="row">
                            <h3>Rating</h3>
                            <h5>average rating</h5>
                        </div>
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