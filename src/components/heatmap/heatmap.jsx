import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { AddressPoints } from "../addressPoints";
import { Getheatdata } from "../service/dataservice";

export default function Heatmap(props) {
  const [heatlatlngdata,setheatlatlngdata] = React.useState([])

//   const getheatdata = ()=>{
//     Getheatdata().then((res)=> {
//       let filterArray = res.data.filter((city)=> {
        
//           if(props.heatdata == city.heatmapname)
//           return city
//       })
//       setheatlatlngdata(filterArray)
//   }).catch((err)=> {
//       console.log(err)
//   })
//   }

//   console.log(heatlatlngdata)

//     let heatArray  = [];

//   for(let i=0;i<heatlatlngdata.length;i++){
//     let add = {
//         lat : heatlatlngdata[i].lat,
//         lng : heatlatlngdata[i].lng,

//     }
//     // let add = [heatlatlngdata[i].lat,heatlatlngdata[i].lng]
//     heatArray.push(add);
// }

 
//   let heatArray = [ [21.685824107844926,81.30172688848663],[23.269419300371798,79.80715868015236],[19.981415390775354,79.03789563174502],[22.92582825814942,75.98282238235592],[21.604130904282965,81.41162160968766],
// [20.62025298122745,76.99385381740555],[21.685824107844926,82.00505310417334],[21.706240180885235,81.71932682905062],[21.66540514148,81.60943210784954]]
 
  useEffect(() => {

    Getheatdata().then((res)=> {
      var filterArray = res.data.filter((city)=> {
        
          if(props.heatdata == city.heatmapname)
          return city
      })
      // setheatlatlngdata(filterArray)
      // var filterArray1 = filterArray
      console.log(filterArray)

      var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }
      
    var map = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    const points = filterArray
      ? filterArray.map((p) => {
        console.log(p.heatmapname)
          return [p.lat, p.lng];
        })
      : [];
  
    L.heatLayer(points).addTo(map);
  
   
  }).catch((err)=> {
      console.log(err)
  })

    // getheatdata()

   
 
  }, [props.heatdata]);

  

  
  return <div id="map" style={{ height: "100vh" }}>
    
  </div>;

}


