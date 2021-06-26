import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import './cssfile';
import React from "react";
import {
  BrowserRouter,
  Route,
  useEffect,
  useState,
  Login,
  Register,
  Navbar,
  Forgot,
  Reset,
  Profile,
  HomeSite,
  ProtectedRoute,
  Card,
  MainHome,
  MyAppointments
} from './imports';
import Footer from './components/patient/Footer';

function App() {

  const { t } = useTranslation();

  const sendLangToParent = (lang) => {
    i18n.changeLanguage(lang)
  };

  let [searchParams, setSearchParams] = useState([]);
  let [appointment, setAppointment] = useState(false);

  let [user, setUser] = useState({});
  let [doctorData, setDoctorData] = useState([]); 
  let [login, setLogin] = useState(false);
  let [profile, setprofile] = useState(false);
  
    const sendDoctorDataParentHome = (index,searchParams) => {
        // the callback. Use a better name
        console.log("ParentHome | sendDoctorDataParentHome => ", index);
        console.log("ParentHome | sendSearchParamsParentHome => ", searchParams);
        // setDoctorData(index);
        setDoctorData(index);
        setSearchParams(searchParams);
        localStorage.setItem('data', JSON.stringify(index));
    localStorage.setItem('searchParams', searchParams['specialty']);
      };
  //start
  
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
    

},[login,profile, appointment]);

  return (
    <BrowserRouter>
        <Navbar user={user} setUser={setUser} setLogin={() => setLogin(false)} sendLangToParent={sendLangToParent} t={t}/>  
        <Route path="/" exact component={() => <HomeSite sendDoctorDataParentHome={sendDoctorDataParentHome} t={t}/>}/>
        <Route path="/home" exact component={() => <MainHome user={doctorData} searchParams={searchParams} t={t}/>}/>
        <Route path="/my-appointments" component={() => <MyAppointments user={user} setAppointment={() => setAppointment(true)} />}/>
        <Route path="/login" component={() => <Login setUser={setUser} setLogin={() => setLogin(true)} t={t}/>}/>
        <Route path="/register" component={() => <Register  t={t}/>}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/reset/:token" component={Reset}/>
        <ProtectedRoute path="/profile" component={() => <Profile user={user} setprofile={() => setprofile(true)}/>}/>
        <Route path="/doctors/:id" component={() => <Card user={user} setAppointment={() => setAppointment(false)} />}   />
        <Footer user={user} setUser={setUser} setLogin={() => setLogin(false)} sendLangToParent={sendLangToParent} t={t}/>  

    </BrowserRouter>
  );
}

export default App;
