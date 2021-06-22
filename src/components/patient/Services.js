import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';



function Services() {
    return (
        <React.Fragment>

        <section className="section custom-tabs" data-aos="fade-up">
        <div className="container">

          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center mb-5">
              <h2 className="text-uppercase heading border-bottom mb-4"> Services </h2>
              <p className="mb-0 lead"> We Provide Services For Patient, Doctor And Phramcy </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 border-right">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <Link className="nav-link active" id="v-pills-home-tab" data-toggle="pill" to="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><span>01</span>  Doctor For Patient </Link>
                <Link className="nav-link" id="v-pills-profile-tab" data-toggle="pill" to="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><span>02</span>  Doctor For Doctor </Link>
                <Link className="nav-link" id="v-pills-messages-tab" data-toggle="pill" to="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><span>03</span> Doctor For Pharmacy </Link>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-7">

              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <span className="icon fa fa-user-injured my-4"></span>
                  <h2 className="text-primary">Patient</h2>
                  <p className="lead">Patient Description</p>

                </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                  <span className="icon fa fa-user-md my-4"></span>
                  <h2 className="text-primary">admin.Doctor</h2>
                  <p className="lead">Doctor Description</p>

                </div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <span className="icon fas fa-flask my-4"></span>
                  <h2 className="text-primary">Pharmacy</h2>
                  <p className="lead">Pharmacy Description</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

</React.Fragment>
);
}

export default Services;