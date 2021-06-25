import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
function TimeTable(props) {
    // const alert = useAlert(‏);
    console.log('==========time table user==========')
    console.log(props.user.id);
    console.log('==========time table user==========')

    const submit = (index) =>(e)=> {
        e.preventDefault();
        console.log('index', index);
        let formdata = {};
        formdata.address_id = document.getElementById("address_id"+index).value;
        formdata.doctor_id  = document.getElementById("doctor_id"+index).value;
        formdata.patient_id = props.user.id
        formdata.day        = document.getElementById("day"+index).value;
        formdata.time       = document.getElementById("time"+index).value;
        formdata.fees       = document.getElementById("fees"+index).value;

        fetch(`http://127.0.0.1:8000/api/book/store`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formdata)

        }).then((response) => response.json())
        .then( response => {
            setIsRendered(false);

            console.log("response.errors",response.errors);
            console.log('====================================')

            setIsRendered(true);
            console.log('====================================')
            if(response.status === 201){
                props.setAppointment(); 
                alert.success(response.message);
            }else{
            }
        }).catch(error => {
            console.log("error",error);
            });
        
    }

    function getTimeTables(docID, addressID) {   

        fetch(`http://localhost:8000/api/available-time/${docID}/${addressID}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .then((response) => {
            return response.json();
          })
        .then((data) => {
            console.log(data);
            setTimes(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const [times, setTimes] = useState([{}]);
    const [is_rendered, setIsRendered] = useState(false);

    useEffect(() => {
        getTimeTables(props.id,1);  
    }, [is_rendered]);  

    let times_table = times;

    let x = 1;

    let cards =  times_table.map((item) =>  {
        x++;
        return (    
            <div class="slider-item col-4">
        <div class="px-lg-5 py-3">
            <div class="slider-item-content px-lg-5">
                <b> {item.day} </b><br/> <span>From {item.from} :00</span> <span>To {item.to} :00</span>
                <p class="lead">
                    {item.id? item.id : ''}
                </p> 
                <h5>
                    <b>Fees:</b>{item.fees? item.fees : ''}
                </h5>

            {/* time slots */}
            {

            item.time_slot ? 
                item.time_slot.map((i, index) => { 

                    if(!item.blocked_times.includes(i.starts)){

                        return ( <h5><b>{i.starts}</b>
                        
                        <div class="time">
                            <form className="" onSubmit={submit(index+item.day)}>
                                <input type="hidden" id="index"  name="index" value={index+item.day} />
                                <input type="hidden" id={"doctor_id"+index+item.day}  name="doctor_id" value={props.id} />
                                <input type="hidden" id={"address_id"+index+item.day} name="address_id" value={item.doctor_address_id} />
                                <input type="hidden" id={"time"+index+item.day}       name="time" value={i.starts} />
                                <input type="hidden" id={"day"+index+item.day}        name="day" value={item.day} />
                                <input type="hidden" id={"fees"+index+item.day}       name="fees" value={item.fees} />
                                
                                <button className="btn mb-3 btn-sm" >book</button>
                            </form>
                        </div>

                        </h5> )  } ; 
                    })      
                :''

                
            }
            </div>
        </div>
        </div>
        
    )});



    return (
        
        <section class="booking-time">
            <div class="container">
                <div class="card mb-5">
                    <div class="card-header">
                        <h5 class="card-title mb-0"><i class="fa fa-calendar-alt"></i> Time Slots</h5>
                    </div>
                    <div class="card-body">
                        <div class="booking-slider owl-carousel row">
                            {cards} 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TimeTable;