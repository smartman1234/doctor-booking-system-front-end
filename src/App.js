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
import Nav from './components/navbar/Nav';
import { useEffect, useState } from 'react';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import Profile from './components/Profile/Profile';
import SearchBar from './components/searchbar/SearchBar';

import HomeSite from './components/patient/HomeSite';

function App() {
  let [user, setUser] = useState([]);
  let [login, setLogin] = useState(false);
  let [profile, setprofile] = useState(false);
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
      <div className="container"> 
        <Nav user={user} setUser={setUser} setLogin={() => setLogin(false)}/>  
        <SearchBar sendDataToParent={sendDataToParent} />
        <Route path="/" exact component={() => <Home user={user} />}/>
        <Route path="/site" exact component={() => <HomeSite />}/>
        <Route path="/login" component={() => <Login setUser={setUser} setLogin={() => setLogin(true)}/>}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/reset/:token" component={Reset}/>
        <Route path="/profile" component={() => <Profile user={user} setprofile={() => setprofile(true)}/>}/>
    </div>
      </BrowserRouter>
  );
}

export default App;
