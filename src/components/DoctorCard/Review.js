import React,{useState} from "react";

function Review(props) { 
    const [rate, setRate] = useState("");
    const [comment, setComment] = useState("");

    //Send Rate and Comment of Patient on Doctor
    const submit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append('rate', rate);
        formdata.append('comment', comment);
        formdata.append('doc_id', 1);        
        formdata.append('patient_id', 1);
        fetch(`http://127.0.0.1:8000/api/feedbacks`, {
            method: 'POST',
            body: formdata
        }).then( response => {
            console.log("response",response);
        }).catch(error => {
            console.log("error",error);
        });
    }
    
    return (
        <React.Fragment>
            <section class="store-rate-comment">
                <div id="ratingModal" class={props.show ? "modal fade" : " "} aria-hidden="true" role="dialog" >
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