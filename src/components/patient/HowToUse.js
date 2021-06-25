import React, {useState} from 'react';

function HowToUse({t}) {
    return (
        <React.Fragment>

        <section className="section steps" data-aos="fade-up">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-8 text-center mb-5">
                <h2 className="text-uppercase heading border-bottom mb-4">{t('HowToUse.use')}  </h2>
                <p className="mb-0 lead">{t('HowToUse.useDesc')}  </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="media d-block media-feature text-center">
                  <span className="icon fa fa-search my-4"></span>
                  <div className="media-body">
                    <h3 className="mt-0 text-black"><span className="number">1</span>{t('HowToUse.search')}  </h3>
                    <p>{t('HowToUse.searchExpert')}  </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="media d-block media-feature text-center">
                  <span className="icon fa fa-user-md my-4"></span>
                  <div className="media-body">
                    <h3 className="mt-0 text-black"><span className="number">2</span>{t('HowToUse.choose')}  </h3>
                    <p> {t('HowToUse.chooseSuitable')} </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="media d-block media-feature text-center">
                  <span className="icon fa fa-calendar-alt my-4"></span>
                  <div className="media-body">
                    <h3 className="mt-0 text-black"><span className="number">3</span>{t('HowToUse.book')}  </h3>
                    <p>{t('HowToUse.bookAppointment')} </p>
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