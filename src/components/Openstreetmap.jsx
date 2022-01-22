
import React, { useEffect, useRef, useState } from "react";
import {MapContainer,TileLayer,Marker, Popup, useMapEvents,MapConsumer} from "react-leaflet";
import osm from '../components/Osm-providers'
import '../components/openstreet.css'
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import icon from '../../src/assests/marker.png';
import {PinnedLocation,getlocation,getaddress} from '../components/service/dataservice'


// import ReactLeafletSearch from 'react-leaflet-search';

const markerIcon = new L.Icon({
    iconUrl: require('../../src/assests/marker.png'),
    iconSize: [25,35],
   iconAnchor: [17,45], // (left right, top bottom)
   popupAnchor: [3,-46]  // (left right, top bottom)
})

const Openstreetmap = () => {
    const [center,setcenter] = useState({lat: 20.5937, lng: 78.9629})
    const [latlongdata,setlatlongdata] = useState([])
    const ZOOM_LEVEL = 6;
    const mapRef = useRef();
    //const geocoder = L.Control.Geocoder.nominatim();

   
        const getmap = (obj) => {
                const {lat, lng} = obj.latlng
                
                getaddress(lat,lng).then((res)=> {
                    console.log(res)
                    const data = {
                        lat : lat,
                        lng : lng,
                        user: localStorage.getItem("token"),
                        state : res.data.address.state,
                        district : res.data.address.state_district,
                        county : res.data.address.county
                    }
                    PinnedLocation(data).then((res)=> {
                        console.log(res)
                        getlocationdata()
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }

           const getlocationdata = () => {
            getlocation().then((res) => {
                console.log(res.data)
                setlatlongdata(res.data)
            }).catch((err)=> {
                console.log(err)
            })
           }


       useEffect(()=> {
        getlocationdata()
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
                   latlongdata.map((city,idx) => 
                   <Marker position={[city.lat, city.lng]} icon={markerIcon} key={idx}>
                   
               <Popup>
                   <b>Visakhapatnam</b>
               </Popup>
               </Marker>)
                  } 
              </MapContainer>
        </div>
    )
}

export default Openstreetmap