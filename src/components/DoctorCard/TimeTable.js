import React, { useEffect, useState } from "react";
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
    })
    .catch((error) => {
        console.log(error);
    });
}

function TimeTable(props) {
    
    // useEffect(() => {
    //     getTimeTables(1);  
    // }, []);  

    return (
        <section class="booking-time">
            <div class="container">
                <div class="card mb-5">
                    <div class="card-header">
                        <h5 class="card-title mb-0"><i class="fa fa-calendar-alt"></i> Time Slots</h5>
                    </div>
                    <div class="card-body">
                        <div class="booking-slider owl-carousel">

                            {/* @foreach($newTimesTable as $table)


                                @php
                                    $numberOfBooked = checkTableTime($address->doctor->id,$address->id,$table->date);
                                @endphp
                                
                                @if($numberOfBooked != $table->session_number)
                                    @include('patient.commonUsedCode.booking',['timeTable' => $table])
                                @endif
                            @endforeach */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TimeTable;