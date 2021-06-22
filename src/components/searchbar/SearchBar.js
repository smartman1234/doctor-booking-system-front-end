import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: "",
      city: "",
      disc: "",
      dis: "none",
      disCity: "none",
      disdistrict: "none",
      index_specialists: 1,
      lastPage_specialists: "",
      index_cities: 1,
      lastPage_cities: "",
      index_districts: 1,
      lastPage_districts: "",
      doctorName: "",
      doctorNamePlaceHolder: "Doctor Name",
      chooseSpecialty: "Choose specialty",
      chooseSpecialtyID: "",
      chooseCity: "Choose city",
      chooseCityID: "",
      chooseDistrict: "Choose area",
      chooseDistrictID: "",
      specialists: [],
      cities: [],
      districts: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSpecialistsClick = this.handleSpecialistsClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {}
  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    this.getSpecialistsAPI(this.state.index_specialists);
    this.getCitiesAPI(this.state.index_cities);
  }
  getSpecialistsAPI(indexVal) {
    fetch("http://localhost:8000/api/specialists?page=" + indexVal)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("specialists => ", data.data);
        this.setState({
          lastPage_specialists: data.last_page,
        });
        let specialistsFromApi = data.data.map((specialist) => {
          return {
            id: specialist["id"],
            value: specialist["name_en"],
            display: specialist["name_en"],
          };
        });
        this.setState({
          specialists: specialistsFromApi,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  init() {
    this.setState({
      specialty: "",
      city: "",
      disc: "",
      dis: "none",
      disCity: "none",
      disdistrict: "none",
      index_specialists: 1,
      lastPage_specialists: "",
      index_cities: 1,
      lastPage_cities: "",
      index_districts: 1,
      doctorName: "",
      lastPage_districts: "",
      chooseSpecialty: "Choose specialty",
      chooseSpecialtyID: "",
      chooseCity: "Choose city",
      chooseCityID: "",
      chooseDistrict: "Choose area",
      chooseDistrictID: "",
      specialists: [],
      cities: [],
      districts: [],
    });

    this.getSpecialistsAPI(this.state.index_specialists);
    this.getCitiesAPI(this.state.index_cities);
  }

  search(key) {
    fetch(
      `http://127.0.0.1:8000/api/search?name=${key["name"]}&specialty=${key["specialty"]}&city=${key["city"]}&district=${key["district"]}`,
      {
        method: "GET",
        params: {
          id: 1,
          choices: 2,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.props.sendDataToParent(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getCitiesAPI(indexVal) {
    fetch("http://localhost:8000/api/cities/70?page=" + indexVal)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("cities => ", data.data);
        this.setState({
          lastPage_cities: data.last_page,
        });
        let specialistsFromApi = data.data.map((city) => {
          return {
            id: city["id"],
            value: city["name_en"],
            display: city["name_en"],
          };
        });
        this.setState({
          cities: specialistsFromApi,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDistrictsAPI(cityID, indexVal) {
    fetch(`http://localhost:8000/api/districts/${cityID}?page=${indexVal}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("districts => ", data.data);

        this.setState({
          lastPage_districts: data.last_page,
        });
        let specialistsFromApi = data.data.map((district) => {
          return {
            id: district["id"],
            value: district["name_en"],
            display: district["name_en"],
          };
        });
        this.setState({
          districts: specialistsFromApi,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleClick = () => {
    let val = this.state.dis == "none" ? "block" : "none";
    this.setState({ dis: val, disCity: "none", disdistrict: "none" });
  };
  handleSpecialistsClick(event) {
    console.log(event.target.name);
    this.setState({
      chooseSpecialty: event.target.name,
      chooseSpecialtyID: event.target.id,
      specialty: event.target.id,
    });
    let val = this.state.dis == "none" ? "block" : "none";
    this.setState({ dis: val, disCity: "none", disdistrict: "none" });
  }

  handleCityClick = (event) => {
    console.log(event.target.name);
    console.log(event.target.id);
    this.setState({
      chooseCity: event.target.name,
      chooseCityID: event.target.id,
      city: event.target.id,
    });
    let val = this.state.disCity == "none" ? "block" : "none";
    let cityID = event.target.id;
    this.setState({ disCity: val, dis: "none", disdistrict: "none" });
    this.getDistrictsAPI(cityID, this.state.index_districts);
  };

  handleCityToggleClick = (event) => {
    let val = this.state.disCity == "none" ? "block" : "none";
    this.setState({ disCity: val, dis: "none", disdistrict: "none" });
  };

  handleDistrictClick = (event) => {
    console.log(event.target.name);
    console.log(event.target.id);
    this.setState({
      chooseDistrict: event.target.name,
      chooseDistrictID: event.target.id,
      disc: event.target.id,
    });
    let val = this.state.disdistrict == "none" ? "block" : "none";
    this.setState({ disdistrict: val, dis: "none", disCity: "none" });
  };

  handleDistrictToggleClick = (event) => {
    let val = this.state.disdistrict == "none" ? "block" : "none";
    this.setState({ disdistrict: val, dis: "none", disCity: "none" });
  };

  handleSubmit(event) {
    let searchParam = [];
    searchParam["specialty"] =
      this.state.specialty != "" ? this.state.specialty : "";
    searchParam["city"] = this.state.city != "" ? this.state.city : "";
    searchParam["district"] = this.state.disc != "" ? this.state.disc : "";
    searchParam["name"] =
      this.state.doctorName != "" ? this.state.doctorName : "";

    console.log(searchParam);
   
    const el1 = document.querySelector(".test");
    el1.value = "";
    this.init();
    this.search(searchParam);

    event.preventDefault();
  }

  handleNextClick = () => {
    if (this.state.index_specialists < this.state.lastPage_specialists) {
      let indexVal = this.state.index_specialists + 1;
      this.setState({ index_specialists: indexVal });
      this.getSpecialistsAPI(indexVal);
    }
    console.log(this.state.index_specialists);
  };

  test = (event) => {
    event.target.value = "";
  };
  searchByName = (event) => {
    this.setState({ doctorName: event.target.value });
  };
  handlePreClick = () => {
    if (this.state.index_cities > 1) {
      let indexVal = this.state.index_specialists - 1;
      this.setState({ index_specialists: indexVal });
      this.getSpecialistsAPI(indexVal);
    }
    console.log(this.state.index_specialists);
  };

  handleNextCityClick = () => {
    if (this.state.index_cities < this.state.lastPage_cities) {
      let indexVal = this.state.index_cities + 1;
      this.setState({ index_cities: indexVal });
      this.getCitiesAPI(indexVal);
    }
    console.log(this.state.index_cities);
  };

  handlePreCityClick = () => {
    if (this.state.index_cities > 1) {
      let indexVal = this.state.index_cities - 1;
      this.setState({ index_cities: indexVal });
      this.getCitiesAPI(indexVal);
    }
    console.log(this.state.index_cities);
  };

  handleNextDisClick = () => {
    if (this.state.index_districts < this.state.lastPage_districts) {
      let indexVal = this.state.index_districts + 1;
      this.setState({ index_districts: indexVal });
      this.getDistrictsAPI(indexVal);
    }
    console.log(this.state.index_districts);
  };

  handlePreDisClick = () => {
    if (this.state.index_districts > 1) {
      let indexVal = this.state.index_districts - 1;
      this.setState({ index_districts: indexVal });
      this.getCitiesAPI(indexVal);
    }
    console.log(this.state.index_districts);
  };

  render() {
    const mystyle = {
      "max-width": "350px",
      "max-height": "350px",
      "z-index": "2",
    };
    return (
      <div className="bg-white m-2 p-2">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="row">
                <label className="col-12 mb-3">Select a specialty</label>

                <i className="col-1 fas fa-stethoscope fa-lg"></i>
                <div className="col-10 dropdown w-100">
                  <button
                    onClick={this.handleClick}
                    className="btn btn-secondary text-truncate dropdown-toggle"
                    style={{ "max-width": "170px" }}
                    type="button"
                  >
                    {this.state.chooseSpecialty}
                  </button>
                  <div
                    className={
                      "position-absolute d-" +
                      (this.state.dis == "none" ? "none" : "block")
                    }
                    style={mystyle}
                  >
                    <div className="row bg-white p-2 w-100">
                      {this.state.specialists.map((specialist) => (
                        <a
                          className="col-12 btn btn-link"
                          onClick={this.handleSpecialistsClick}
                          key={specialist.value}
                          name={specialist.value}
                          id={specialist.id}
                        >
                          {specialist.display}
                        </a>
                      ))}

                      <div className="col-12">
                        <div className="row justify-content-between">
                          <span
                            onClick={this.handlePreClick}
                            className="btn btn-light btn-lg col-2"
                          >
                            &lt;
                          </span>
                          <span className="col-4">
                            <small>
                              Page {this.state.index_specialists}/
                              {this.state.lastPage_specialists}
                            </small>
                          </span>
                          <span
                            onClick={this.handleNextClick}
                            className="btn btn-light btn-lg col-2"
                          >
                            &gt;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
            <div className="col">
              <div className="row">
                <label className="col-12 mb-3">In this city</label>

                
                  <i class="col-1 fas fa-map-marker-alt fa-lg"></i>
                  <div className="col-10 dropdown w-100">
                    <button
                      onClick={this.handleCityToggleClick}
                      className="btn btn-secondary text-truncate dropdown-toggle"
                      style={{ "max-width": "170px" }}
                      type="button"
                    >
                      {this.state.chooseCity}
                    </button>
                    <div
                      className={
                        "position-absolute d-" +
                        (this.state.disCity == "none" ? "none" : "block")
                      }
                      style={mystyle}
                    >
                      <div className="row bg-white p-2 w-100">
                        {this.state.cities.map((city) => (
                          <a
                            className="col-12 btn btn-link"
                            onClick={this.handleCityClick}
                            key={city.value}
                            name={city.value}
                            id={city.id}
                          >
                            {city.display}
                          </a>
                        ))}

                        <div className="col-12">
                          <div className="row justify-content-between">
                            <span
                              onClick={this.handlePreCityClick}
                              className="btn btn-light btn-lg col-2"
                            >
                              &lt;
                            </span>
                            <span className="col-4">
                              <small>
                                Page {this.state.index_cities}/
                                {this.state.lastPage_cities}
                              </small>
                            </span>
                            <span
                              onClick={this.handleNextCityClick}
                              className="btn btn-light btn-lg col-2"
                            >
                              &gt;
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
              </div>
            </div>
            <div className="col">
              <div className="row">
                <label className="col-12 mb-3">In this area</label>

                  <i class="col-1 fas fa-map-marker-alt fa-lg"></i>
                  <div className="col-10 dropdown w-100">
                    <button
                      onClick={this.handleDistrictToggleClick}
                      className="btn btn-secondary text-truncate dropdown-toggle"
                      style={{ "max-width": "170px" }}
                      type="button"
                    >
                      {this.state.chooseDistrict}
                    </button>
                    <div
                      className={
                        "position-absolute d-" +
                        (this.state.disdistrict == "none" ? "none" : "block")
                      }
                      style={mystyle}
                    >
                      <div className="row bg-white p-2 w-100">
                        {this.state.districts.map((district) => (
                          <a
                            className="col-12 btn btn-link"
                            onClick={this.handleDistrictClick}
                            key={district.value}
                            name={district.value}
                            id={district.id}
                          >
                            {district.display}
                          </a>
                        ))}

                        <div className="col-12">
                          <div className="row justify-content-between">
                            <span
                              onClick={this.handlePreDisClick}
                              className="btn btn-light btn-lg col-2"
                            >
                              &lt;
                            </span>
                            <span className="col-4">
                              <small>
                                Page {this.state.index_districts}/
                                {this.state.lastPage_districts}
                              </small>
                            </span>
                            <span
                              onClick={this.handleNextDisClick}
                              className="btn btn-light btn-lg col-2"
                            >
                              &gt;
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               
              </div>
            </div>
            <div className="col">
              <div className="row justify-content-between">
                <label className="col-12 mb-3">Or search by name</label>

               
                  <i class="col-1 fas fa-user-md fa-lg"></i>
                  <input
                    type="text"
                    className="col-10 w-75 test p-2"
                    placeholder={this.state.doctorNamePlaceHolder}
                    onChange={this.searchByName}
                    onSubmit={this.test}
                  />
              
              </div>
            </div>

            <div className="col">
              <span className="btn btn-outline-primary">
                <i class="fas fa-search"></i>
                <input className="btn btn-light" type="submit" value="Submit" />
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
