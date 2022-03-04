
import React, { useEffect, useRef, useState } from "react";
import {MapContainer,TileLayer,Marker, Popup, useMapEvents,MapConsumer} from "react-leaflet";
import osm from '../components/Osm-providers'
import '../components/openstreet.css'
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import icon from '../../src/assests/marker.png';
import Box from '@mui/material/Box';
import { Postheatdata,Getheatdata } from "./service/dataservice";



// import ReactLeafletSearch from 'react-leaflet-search';

const markerIcon = new L.Icon({
    iconUrl: require('../../src/assests/marker.png'),
    iconSize: [25,35],
   iconAnchor: [17,45], // (left right, top bottom)
   popupAnchor: [3,-46]  // (left right, top bottom)
})

const OpenstreetmapForHeat = (props) => {
    console.log(props)
    const [center,setcenter] = useState({lat: 20.5937, lng: 78.9629})
    const [getcity,setcity] = useState(props.heatdata)
    const [latlngdata,setlatlngdata] = useState([])
    const ZOOM_LEVEL = 5;
    const mapRef = useRef();
    //const geocoder = L.Control.Geocoder.nominatim();
     console.log(props.heatdata)
        const getmap = (obj) => {
           console.log(obj)
           const {lat,lng} = obj.latlng
           console.log(props.heatdata)
          let data = {
               lat : lat,
               lng : lng,
               intensity : Math.floor((Math.random() * 200) + 1),
               heatmapname : props.heatdata
           }
           Postheatdata(data).then((res)=>{
               console.log(res)
               getheatdatafromserver()
           }).catch((err)=>{
               console.log(err)
           })
        }

        const getheatdatafromserver = ()=> {
            Getheatdata().then((res)=> {
                let filterArray = res.data.filter((city)=> {
                    if(props.heatdata == city.heatmapname)
                    return city
                })
                console.log(res)
                setlatlngdata(filterArray)
            }).catch((err)=> {
                console.log(err)
            })
        }
console.log(latlngdata)
        React.useEffect(()=>{
            
            getheatdatafromserver()
        },[])

    return(
        <div className="map-content">
              <MapContainer 
                center = {center}
                zoom= {ZOOM_LEVEL}
                ref={mapRef}
               
                whenReady= {(map) => {
                      console.log(map);
                      map.target.on("click", function (e) {
                        const { lat, lng } = e.latlng;
                        // console.log(e.address.city)
                       
                        getmap(e)
                        console.log(e)
                        
                      });
                     
                     
                    }}
                    
              >
               
                 
               <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/>
               {/* <Marker position={[17.704052,83.297663]} icon={markerIcon}> */}
               {
                  
                  latlngdata.map((city,idx) => 
                   <Marker position={[city.lat, city.lng]} icon={markerIcon} key={idx}>
                   
               </Marker>
             )}  
              </MapContainer>
             
              
        </div>
    )
}

export default OpenstreetmapForHeat