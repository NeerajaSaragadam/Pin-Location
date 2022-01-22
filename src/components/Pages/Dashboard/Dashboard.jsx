import React, { useEffect, useState } from "react";
import '../Dashboard/Dashboard.css'
import MiniDrawer from "../../Drawer/Drawer";
import PinDropIcon from '@mui/icons-material/PinDrop';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { GoogleLogout } from 'react-google-login';
// import { useGoogleLogout } from "react-google-login";
import { Link,useHistory } from 'react-router-dom';
// import { useOktaAuth } from "@okta/okta-react/bundles/types";
import Switch from '@mui/material/Switch';
import Openstreetmap from "../../Openstreetmap";
import '../../../components/openstreet.css'
import Tabledata from "../../tabularview/tabularview";

const clientId = "664121231611-nuqad3rg499oasuu3p86rafufbrh2h89.apps.googleusercontent.com"
const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Dashboard = () => {
    const [checked, setChecked] = React.useState(true)
    // const [switchtablemap,setswitchtablemap] = React.useState(false)
    let history = useHistory();
    
    const responseGoogle = (res) => {
        console.log(res)
        history.push('/');
    }
    const handleChange = (event) => {
        console.log(event.target.checked)
        setChecked(event.target.checked);
      };

      const Listentoedit = (data) => {
        setChecked(data)
      }
    
   
   
    return(
        <div className="body-section">
        <div className="header-content">
            <div className="headpart">
            <div className="dropicons">
                <PinDropIcon/>
                <h3>Pin Location</h3>
            </div>
            <div className="logouticons">
                 {/* <ExitToAppIcon />
                 <h3>Logout</h3> */}
                 <GoogleLogout
               clientId="664121231611-nuqad3rg499oasuu3p86rafufbrh2h89.apps.googleusercontent.com"
               render = {renderProps => (
                   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <ExitToAppIcon />
                      {/* <h3>Logout</h3> */}
                   </button>
               )}
               buttonText="Logout"
               onLogoutSuccess={responseGoogle}
                 />
             
            </div>
            </div>
            <div className="adddrawerr">
                 <MiniDrawer/>
             </div>
        </div>
          <div className="switch-display">
              <div className="swichcont">
              <h4 className="tableh">Table</h4>
          <Switch
         checked={checked}
        onChange={handleChange}
         inputProps={{ 'aria-label': 'controlled' }}
         color="default"
         />
          <h4 className="maph">Map</h4>
          </div>

          

              </div>
              <div className="osm">
            
              {checked ?  <Openstreetmap/> :  <Tabledata Listentoedit ={Listentoedit}/>}
          </div>
          
        </div>

    )
}

export default Dashboard