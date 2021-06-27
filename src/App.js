import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import './cssfile';
import React from "react";
import Footer from './components/patient/Footer';
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
import SubHome from './components/HomeTest/SubHome';

function App() {

  const { t } = useTranslation();

  const sendLangToParent = (lang) => {
    i18n.changeLanguage(lang)
  };

  let [searchParams, setSearchParams] = useState([]);
  let [delAppointment, setdelAppointment] = useState(false);
  let [user, setUser] = useState({});
  let [doctorData, setDoctorData] = useState([]); 
  let [login, setLogin] = useState(false);

  const changestate = () => {
    setdelAppointment(true);
    setdelAppointment(false);
  };
  
    const sendDoctorDataParentHome = (index,searchParams) => {
        // the callback. Use a better name
        console.log("ParentHome | sendDoctorDataParentHome => ", index);
        console.log("ParentHome | sendSearchParamsParentHome => ", searchParams);
        // setDoctorData(index);
        setDoctorData(index);
        setSearchParams(searchParams);
        localStorage.setItem('data', JSON.stringify(index));
        localStorage.setItem('searchParams', searchParams['specialty']);
        let s = {
          specialty : searchParams['specialty'],
          city      : searchParams["city"] ,
          district  : searchParams["district"] ,
          name      : searchParams["name"] 
        }
        localStorage['Params'] = JSON.stringify(s);
    // localStorage.setItem('Params', JSON.stringify(searchParams));
      };
  //start
  
  //end
  useEffect(() => {
    var url;
    if(!!+process.env.REACT_APP_MODE)
    {
      url = `${process.env.REACT_APP_DEVELOPING_URL}api/patientUser`
    }
    else
    {
      url = `${process.env.REACT_APP_PRODUCTION_URL}api/patientUser`;
    }
    
    fetch(url , {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json','Access-Control-Allow-Credentials':'true'},
        credentials: 'include',
    }).then( response => response.json())
    .then(user => {
      console.log("==================================");
      console.log(url);
      console.log("==================================");
        setUser(user);
    }
    )
    .catch(error => {
                console.log(error);
                setUser([]);
    });
    

},[login,delAppointment]);

  return (
    <React.Fragment>
    <BrowserRouter>
        <Navbar user={user} setUser={setUser} setLogin={() => setLogin(false)} sendLangToParent={sendLangToParent} t={t}/>  
        <Route path="/" exact component={() => <HomeSite sendDoctorDataParentHome={sendDoctorDataParentHome} t={t}/>}/>
        <Route path="/home" exact component={() => <MainHome user={doctorData} searchParams={searchParams} t={t}/>}/>
        <Route path="/my-appointments" component={() => <MyAppointments user={user} changestate={changestate}   />}/>
        <Route path="/login" component={() => <Login setUser={setUser} setLogin={() => setLogin(true)} t={t}/>}/>
        <Route path="/register" component={() => <Register  t={t}/>}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/reset/:token" component={Reset}/>
        <ProtectedRoute path="/profile" component={() => <Profile user={user} changestate={changestate}/>}/>
        <Route path="/doctors/:id" component={() => <Card user={user} changestate={changestate}/>}   />
        <Footer t={t}/>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
