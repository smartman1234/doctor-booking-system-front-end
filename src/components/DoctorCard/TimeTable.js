import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";

function TimeTable(props) {
    const alert = useAlert();
    const submit = (e) => {
        e.preventDefault();
        let formdata = {};
        formdata.address_id = document.querySelector(".address_id").value;
        formdata.doctor_id  = document.querySelector(".doctor_id").value;
        formdata.patient_id = document.querySelector(".patient_id").value;
        formdata.day = document.querySelector(".day").value;
        formdata.time = document.querySelector(".time").value;
        formdata.fees = document.querySelector(".fees").value;

        fetch(`http://127.0.0.1:8000/api/book/store`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formdata)
        }).then((response) => response.json())
        .then( response => {
            console.log("response.errors",response.errors);
            if(response.status === 200){
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


    
    useEffect(() => {
        getTimeTables(props.id,1);  
    }, []);  

    let times_table = times;

    let cards =  times_table.map(item =>  {
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
            {item.time_slot ? 
                item.time_slot.map(i => {
                    return ( <h5><b>{i.starts}</b>
                    
                    <div class="time">
                        <form className="" onSubmit={submit}>
                            <input type="hidden" id="doctor_id" name="doctor_id" value={props.id} />
                            <input type="hidden" id="address_id" name="address_id" value={item.doctor_address_id} />
                            <input type="hidden" id="time" name="time" value={i.starts} />
                            <input type="hidden" id="day" name="day" value={item.day} />
                            <input type="hidden" id="fees" name="fees" value={item.fees} />
                            <input type="hidden" id="patient_id" name="patient_id" value={1} />
                            <button className="btn mb-3 btn-sm" >book</button>
                        </form>
                    </div>

                    </h5> );})  
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

                                {/* {JSON.stringify(times_table)} */}

        

                                {cards}



                   

{/* <div class="slider-item">
<div class="px-lg-5 py-3">
    <div class="slider-item-content px-lg-5">

            <span>From :00</span> <span>To {{$timeTable->to}}:00</span>
        <p class="lead">
           {{(Config::get('app.locale') == "en") ? $timeTable->day->name_en : $timeTable->day->name_ar}{"}"} , {{$timeTable->date}}

        </p> 
        

        <div class="time">
        

        @for($i=1;$i<=$timeTable->session_number;$i++)
          
          

            <a class="btn mb-3" data-toggle="modal" data-target="#timeModal{{$timeTable->id}}{{$i}}">
                {{$time}}
            </a>


            
        @endfor
        </div>
    </div>
</div>
</div> */}

 
                    
        





























                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TimeTable;