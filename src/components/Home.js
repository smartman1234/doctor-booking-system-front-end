import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
function Home(props) {
  const [data, setData] = useState([]);
  const [current_page,setCurrent_page] = useState(0);
 const [per_page,setPer_page] = useState(0);
 const [total,setTotal] = useState(0);
  useEffect(() => {
    getData();
    return () => {
        setData([]); // This worked for me
      };
  }, []);

  function getData(pageNumber) {
    fetch(`http://127.0.0.1:8000/api/doctors?page=${pageNumber}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setData(res.data);
        setCurrent_page(res.current_page);
        setPer_page(res.per_page);
        setTotal(res.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const alert = useAlert();
  const notify = () => {
    // SuccessNotify("hello word");
    alert.error("Wait The Admin To Accept You");
  };
  var doctorCard;
  if (data) {
  doctorCard = data.map((doctor) => { return (
                <div className="card mb-4" key={doctor.id}>
                    <div className="card-header">{doctor.name_en}</div>
                    <div className="card-header">{doctor.name_ar}</div>
                    <div className="card-body">
                    <h5 className="card-title">{doctor.mobile}</h5>
                        <p className="card-text">
                            {doctor.session_time}
                        </p>
                        <a href="#" class="btn btn-primary">
                            Book
                        </a>
                    </div>
                </div>
                )})
  } else {
    doctorCard = (<div className="alert alert-danger">No doctors</div>);
  }
  return (
    <React.Fragment>
      {props.user ? "Hi " + props.user.name_en : "You are not logged in"}
      <button onClick={notify}>Notify!</button>

      {doctorCard}

      <div className="mt-3">
        <Pagination
          activePage={current_page}
          itemsCountPerPage={per_page}
          totalItemsCount={total}
          onChange={(pageNumber) => getData(pageNumber)}
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
        />
      </div>
      
    </React.Fragment>
  );
}

export default Home;
