
import './App.css';
import Signup from '../src/components/Pages/SignUp/Signup'
import SignIn from './components/Pages/SignIn/SignIn';
import Router from './components/router/router';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Openstreetmap from './components/Openstreetmap';

function App() {
  return (
    <div className="App">
     {/* <Router>

     </Router> */}
     {/* <Openstreetmap/> */}
     <Router/>
     
    </div>
  );
}

export default App;
