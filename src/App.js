import './cssfile';
import {
  BrowserRouter,
  Route,
  useEffect,
  useState,
  Login,
  Home,
  Register,
  Nav,
  Forgot,
  Reset,
  Profile,
  HomeSite,
  ProtectedRoute,
  Card,
} from './imports';

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
        <Nav user={user} setUser={setUser} setLogin={() => setLogin(false)}/>          
        <Route path="/" exact component={() => <Home user={user} />}/>
        <Route path="/site" exact component={() => <HomeSite />}/>
        <Route path="/login" component={() => <Login setUser={setUser} setLogin={() => setLogin(true)}/>}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/reset/:token" component={Reset}/>
        <ProtectedRoute path="/profile" component={() => <Profile user={user} setprofile={() => setprofile(true)}/>}/>
        <Route path="/doctor" component={Card}/>
    </BrowserRouter>
  );
}

export default App;
