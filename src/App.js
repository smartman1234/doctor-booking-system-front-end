import './components/patient/design/medi/css/bootstrap.css';
import './components/patient/design/medi/css/animate.css';
import './components/patient/design/medi/css/bootstrap-datepicker.css';
import './components/patient/design/medi/css/jquery.timepicker.css';
import './components/patient/design/medi/css/nice-select.css';
import './components/patient/design/medi/fonts/ionicons/css/ionicons.min.css';
import './components/patient/design/medi/fonts/fontawesome/css/all.min.css';
import './components/patient/design/medi/fonts/flaticon/font/flaticon.css';
import './components/patient/design/medi/css/style.css';

import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Register from './components/auth/Register';
import Navbar from './components/navbar/Navbar';
import { useEffect, useState } from 'react';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import Profile from './components/Profile/Profile';
import SearchBar from './components/searchbar/SearchBar';

import HomeSite from './components/patient/HomeSite';

function App() {
  let [searchParams, setSearchParams] = useState([]);

  let [user, setUser] = useState([]);
  let [login, setLogin] = useState(false);
  let [profile, setprofile] = useState(false);
  const [doctorData, setDoctorData] = useState([]); // the lifted state
    const sendDoctorDataParentHome = (index,searchParams) => {
        // the callback. Use a better name
        console.log("ParentHome | sendDoctorDataParentHome => ", index);
        console.log("ParentHome | sendSearchParamsParentHome => ", searchParams);
        // setDoctorData(index);
        setUser(index);
        setSearchParams(searchParams);
      };
  //start
  const sendDataToParent = (index) => { // the callback. Use a better name
    console.log("Index => ",index);
    setUser(index);
  };
  //end
  useEffect(() => {
    
    fetch('http://localhost:8000/api/patientUser', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'http://localhost:3000','Access-Control-Allow-Credentials':'true'},
        credentials: 'include',
    }).then( response => response.json())
    .then(user => {
        console.log(user);
        setUser(user);
    }
    )
    .catch(error => {
                console.log(error);
                setUser([]);
    });
    

},[login,profile]);

  return (
    <BrowserRouter>
      
        <Navbar user={user} setUser={setUser} setLogin={() => setLogin(false)}/>  
        
        <Route path="/" exact component={() => <Home user={user} searchParams={searchParams} />}/>
        <Route path="/site" exact component={() => <HomeSite sendDoctorDataParentHome={sendDoctorDataParentHome}/>}/>
        <Route path="/login" component={() => <Login setUser={setUser} setLogin={() => setLogin(true)}/>}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/reset/:token" component={Reset}/>
        <Route path="/profile" component={() => <Profile user={user} setprofile={() => setprofile(true)}/>}/>

      </BrowserRouter>
  );
}

export default App;
