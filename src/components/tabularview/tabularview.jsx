import React from "react";
import '../tabularview/tabularview.css'
import {getlocation} from "../service/dataservice";
import Openstreetmap from "../Openstreetmap";

const Tabledata = (props) => {
    console.log(props)
    const [tabledata,settabledata] = React.useState([])
    const [openmap,setopenmap] = React.useState(false)
    const [editdata,seteditdata] = React.useState([])
    const gettabledata = () => {
        getlocation().then((res) => {
            console.log(res)
            settabledata(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    console.log(tabledata)
    

    const handleedit = (data) => {
        setopenmap(true)
        console.log("testing",data)
        seteditdata(data)
      //props.Listentoedit(false,e.target.value)
    }

    React.useEffect(()=> {
        gettabledata()
    },[])
    return(
        
        <div className="tablemapdata">
             {
                openmap ? <div className="mapview"> <Openstreetmap editdata={editdata}/> </div> : 
          <div className="tabledata">  
            <table>
                <tbody>
                    <tr>
                        <th>Place</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Address</th>
                        <th colSpan="1">Map view</th>
                    </tr>
                   
                        {
                             tabledata.map((data) => 
                             <tr>
                            <td>{data.Place}</td>
                            <td>{data.lat}</td>
                            <td>{data.lng}</td>
                            <td>{data.county},{data.district},{data.state}</td>
                            <td><button  onClick={() => handleedit(data)}>edit</button><button>delete</button><button onClick={() => handleedit(data)}>map view</button></td> 
                            </tr>)
                       }
                </tbody>
            </table>
            </div>
           
                    }
        </div>
    )
}

export default Tabledata