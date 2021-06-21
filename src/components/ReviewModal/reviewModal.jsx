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
        let review = {
            StarRating: 5,
            Review_body: reviewText,
            ProductId: product.id
        }
        let config = {headers: { Authorization: `Bearer ${token}`}, review};

        setReviewText("");
        debugger;
        try{
            const reply = await axios.post("https://localhost:44394/api/review/", config)
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
                        <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <li><button class="dropdown-item" type="button">Action</button></li>
    <li><button class="dropdown-item" type="button">Another action</button></li>
    <li><button class="dropdown-item" type="button">Something else here</button></li>
  </ul>
</div>
                        <input onChange={event => setReviewText(event.target.value)} type="text" name="review" id="review" value={reviewText} />
                        <button type="submit" value="Post" id={product.id}>Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="reply-modal-button">
                        <Button onClick={toggleModal}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }

export default ReviewModal;