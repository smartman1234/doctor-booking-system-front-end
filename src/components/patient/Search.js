import React, {useState} from 'react';
import Cities from './Cities';
import Departments from './Departments';
import Districts from './Districts';
import OurSystem from './OurSystem';

function Search() {
    return (
        <React.Fragment>
            
            <section className="container home-search home-page-search mb-5" data-aos="fade-up">
        <form action="#" method="get" className="search-box">
          <div className="row">
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label for="city"><i className="fa fa-search-location"></i>City</label>
              <div className="nice-select" tabindex="0"><span className="current"></span>
                <Cities/>
              </div>
            </div>
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label for="district"><i className="fa fa-search-location"></i>District</label>
              
              <div className="nice-select" tabindex="0"><span className="current"></span>
                <Districts />
              </div>
          </div>
          <div className="select-form col-lg col-md-4 col-sm-12">
            <label for="department"><i className="fa fa-list"></i>Department</label>
            
            <div className="nice-select" tabindex="0"><span className="current"></span>
              <Departments/>
            </div>
        </div>
            <div className="input-form col-lg-3 col-md-8 col-sm-10">
              <label for="doctor"><i className="fa fa-user-md"></i>Doctor</label>
              <input id='doctor' type="text" name="doctor" placeholder="Write Doctor Name" />
            </div>
            <button className="search-form col-lg-1 col-md-4 col-sm-2" type="submit"><i className="fa fa-search"></i></button>
          </div>
      </form> 
      </section>

    </React.Fragment>
);
}

export default Search;