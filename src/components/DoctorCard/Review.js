import React,{useState} from "react";
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode' // import dependency


function Review(props) { 
    // const cookies = new Cookies();
    // console.log(cookies.get("jwt").substr(1) );
    // let token = cookies.get("jwt").substr(1);
    // jwt_decode(token, { header: true });
    // // const token = cookies.get("jwt");
    // // var decoded = jwt_decode(token);
    // console.log('====decode====')
    // console.log(token);
    // console.log('====decode====')
    const [rate, setRate] = useState("");
    const [comment, setComment] = useState("");

    //Send Rate and Comment of Patient on Doctor
    const submit = (e) => {
        e.preventDefault();
        let formdata = {};
        formdata.rate = rate;
        formdata.comment = comment;
        formdata.patient_id = 1;
        formdata.doc_id = props.id;

        fetch(`http://127.0.0.1:8000/api/feedbacks`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formdata)
        }).then( response => {
            console.log("response",response);
        }).catch(error => {
            console.log("error",error);
        });
    }
    
    return (
        <React.Fragment>
            <section class="store-rate-comment">
                <div id="ratingModal"  aria-hidden="true" role="dialog" >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">eee</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form name="review" action="http://127.0.0.1:8000/api/feedbacks" onSubmit={submit} method="POST">
                                <div class="modal-body modal-rating">
                                    <div class="rating">
                                        <input type="radio" name="rating" value="5" id="5" onChange={(e) => setRate(e.target.value)} /><label for="5">☆</label>
                                        <input type="radio" name="rating" value="4" id="4" onChange={(e) => setRate(e.target.value)} /><label for="4">☆</label>
                                        <input type="radio" name="rating" value="3" id="3" onChange={(e) => setRate(e.target.value)} /><label for="3">☆</label>
                                        <input type="radio" name="rating" value="2" id="2" onChange={(e) => setRate(e.target.value)} /><label for="2">☆</label>
                                        <input type="radio" name="rating" value="1" id="1" onChange={(e) => setRate(e.target.value)} /><label for="1">☆</label>
                                    </div>
                                    <h5>Review</h5>
                                    <textarea name="comment" class="form-control" id="comment" onChange={(e) => setComment(e.target.value)}></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary">Send Feedback </button>
                                    <button type="button" class="btn btn-secondary" onClick={props.close} data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default Review;