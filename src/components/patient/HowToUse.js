import React, {useState} from 'react';

function HowToUse() {
    return (
        <React.Fragment>

        <section className="section steps" data-aos="fade-up">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-8 text-center mb-5">
                <h2 className="text-uppercase heading border-bottom mb-4"> How To Use </h2>
                <p className="mb-0 lead"> How To Use Description </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="media d-block media-feature text-center">
                  <span className="icon fa fa-search my-4"></span>
                  <div className="media-body">
                    <h3 className="mt-0 text-black"><span className="number">1</span> Search </h3>
                    <p> Search Description </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="media d-block media-feature text-center">
                  <span className="icon fa fa-user-md my-4"></span>
                  <div className="media-body">
                    <h3 className="mt-0 text-black"><span className="number">2</span> Choose </h3>
                    <p> Choose Description </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="media d-block media-feature text-center">
                  <span className="icon fa fa-calendar-alt my-4"></span>
                  <div className="media-body">
                    <h3 className="mt-0 text-black"><span className="number">3</span> Book Appointment </h3>
                    <p> Book Appointment Description </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="media d-block media-feature text-center">
                  <span className="icon fa fa-prescription-bottle my-4"></span>
                  <div className="media-body">
                    <h3 className="mt-0 text-black"><span className="number">4</span> Get Prescription </h3>
                    <p> Get Prescription Description </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
      </section>
      

</React.Fragment>
);
}

export default HowToUse;