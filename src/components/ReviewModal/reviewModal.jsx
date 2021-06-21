import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';



function ReviewModal(props){

    const [reviewText, setReviewText] = useState("");
    const [modalState, setModalState] = useState(props.modalState);
    const toggleModal = () => {
        props.toggleModal(props.product);
    };
    let product = props.product;

    console.log(props.modalState);
    const reviewSubmit = async (event, product) => {
        event.preventDefault();
        let token = localStorage.getItem('token');
        let e = document.getElementById("inputGroupSelect01");
        let rating = parseInt(e.value);
        let review = {
            StarRating: rating,
            Review_body: reviewText,
            ProductId: product.id
        }
        let config = {headers: { Authorization: `Bearer ${token}`}};

        setReviewText("");
        try{
            const reply = await axios.post("https://localhost:44394/api/review/", review, config)
            props.toggleModal(product);
        }
        catch(ex){
            console.log(`Error: ${ex}`)
        }
    }

    return(
        <div>
            <Modal show={props.modalState} onHide={() => toggleModal}>
                <Modal.Header>Reply</Modal.Header>
                <Modal.Body>
                    <form id={product.id} onSubmit={event => reviewSubmit(event, product)}>
                        <label for="reply">Leave your review of {product.name} here:</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Options</label>
                            </div>
                            <select class="custom-select" id="inputGroupSelect01">
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option selected value="5">Five</option>
                            </select>
                            </div>
                        <input onChange={event => setReviewText(event.target.value)} type="text" name="review" id="review" value={reviewText} />
                        <button type="submit" value="Post" id={product.id}>Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="reply-modal-button">
                        <Button onClick={() => toggleModal(product)}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }

export default ReviewModal;