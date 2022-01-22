import { BrowserRouter,Route, Switch } from "react-router-dom";
import SignIn from "../Pages/SignIn/SignIn";
import Signup from "../Pages/SignUp/Signup";
import Dashboard from "../Pages/Dashboard/Dashboard";

function Router(){
    return(
        <div>
            <BrowserRouter>
             <Switch>
                 <Route exact path="/" component = {SignIn} />
                 <Route exact path="/Signup" component = {Signup} />
                 <Route exact path="/Dashboard" component = {Dashboard} />
             </Switch>
            </BrowserRouter>

        </div>
    )
}
export default Router