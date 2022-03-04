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
// import Heatmap from "../../heatmap/heatmap";
import Heatmap from "../../heatmap/heatmap";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { PostAddHeat,Getheatdata,getlocation } from "../../service/dataservice";
import OpenstreetmapForHeat from "../../heatosm";

const clientId = "664121231611-nuqad3rg499oasuu3p86rafufbrh2h89.apps.googleusercontent.com"
const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Dashboard = () => {
    const [checked, setChecked] = React.useState(true)
    const [heatlatlngdata,setheatlatlngdata] = React.useState([])
    const [switchpinheat,setswitchpheat] = React.useState(true)
    const [addheatmap,setaddheatmap] = React.useState(false)
    const [takehmap,settakehmap] = React.useState("")
    const [getheatcity,setheatcity] = React.useState(false)
    const [heatdata,setheatdata] = React.useState("")
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

    //   const Listentoedit = (data,obj) => {
    //     setChecked(data)
    //     seteditval(obj)
        
    //   }
    //   console.log(editval)
    
   const Listentodrawerheat = (data) => {
    setswitchpheat(data)
   }
   const Listentopindash = (data) => {
    setswitchpheat(data)
    setheatcity(false)
   }
   const addnewheatmap = () => {
    setaddheatmap(true)
   }
   const Listentoaddheatmap = (data) => {
       console.log(data)
       setheatdata(data)
    setswitchpheat(false)
    setheatcity(false)
   }
   const handlesave = () => {
     let data = {
           heatmap : takehmap,
           user :  tokenid
       }
       PostAddHeat(data).then((res)=>{
           console.log(res)
       }).catch((err)=>{
           console.log(err)
       })
    setaddheatmap(false) 
   }
   const takeheatmap = (e) => {
    settakehmap(e.target.value)
   }
   const handleaddlocation = ()=> {
       console.log("clicked................")
       setheatcity(true)
       setChecked(true)
   }
   console.log(takehmap)
   let tokenid = localStorage.getItem("token")
   console.log(tokenid)

//    const getheatdata = ()=>{
//     Getheatdata().then((res)=> {
//         console.log(heatdata)
//       let filterArray = res.data.filter((city)=> {
        
//           if(heatdata == city.heatmapname)
//           return city
//       })
//       setheatlatlngdata(filterArray)
//   }).catch((err)=> {
//       console.log(err)
//   })
//   }
//   console.log(heatlatlngdata)
//   React.useEffect(()=> {
//     getheatdata()
//   },[heatdata])


  const propertyValues = Object.values(heatlatlngdata);

  console.log(propertyValues)

 

//   let heatArray  = [];

//   for(let i=0;i<heatlatlngdata.length;i++){
//     let add = {
//         lat : heatlatlngdata[i].lat,
//         lng : heatlatlngdata[i].lng,

//     }
//     // let add = [heatlatlngdata[i].lat,heatlatlngdata[i].lng]
//     heatArray.push(add);
// }
 

//   console.log(heatArray) 

const getlocationdata = () => {
    getlocation().then((res) => {
        console.log(res.data)
       
    }).catch((err)=> {
        console.log(err)
    })
   }

React.useEffect(()=> {
    getlocationdata()
},[heatdata])


    return(
        <div className="body-section">
        <div className="header-content">
        <AppBar position="static" color="primary" enableColorOnDark>
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
                   <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <ExitToAppIcon />
                      {/* <h3>Logout</h3> */}
                   </div>
               )}
               buttonText="Logout"
               onLogoutSuccess={responseGoogle}
                 /> <h4>LOGOUT</h4>
             
            </div>
            </div>
            </AppBar>
            <div className="adddrawerr">
                 <MiniDrawer Listentominidrawer = {Listentodrawerheat} Listentopindash = {Listentopindash} heatdata={heatdata} Listentoaddheatmap={Listentoaddheatmap}/>
             </div>
        </div>
        {
            switchpinheat ? 
        
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

              </div>  :  <div className="btnsadd">

                  {heatdata && <div>{heatdata} Heat Map</div>}
                <div className="addmorebtn">
              <Button variant="contained" size="small"  onClick={handleaddlocation}> Add More Locations</Button>

             <Button variant="contained" size="small"  onClick={addnewheatmap}>Add heat map</Button>
             </div>
              </div>

}

        {
            addheatmap ? <div className="addheatmap"> 
            <div className="addnewbar">
              <AppBar position="static" color="primary" enableColorOnDark style={{height:"50px"}}>
                  <h4 className="newhead">Add New HeatMap</h4>
              </AppBar>
              </div>
              <div className="addname">
                  <div className="labelname">
                  <label className="lname">Name : </label>
                  <input type="text" onChange={takeheatmap}/>
                  </div>
                  <div className="savebtn">
                  <Button variant="contained" size="small" style={{width:"120px"}} onClick={handlesave}> Save</Button>
                  </div>
             </div>
            </div> :  <div className="osm">
              {
               getheatcity ? <OpenstreetmapForHeat heatdata={heatdata}/> : switchpinheat ?   checked ?  <Openstreetmap/> :  <Tabledata/>  : <Heatmap heatdata = {heatdata}/> 
             }    
          </div>
          
      

        }
              

              </div>
          
             

    )
}

export default Dashboard