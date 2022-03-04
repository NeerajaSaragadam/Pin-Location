import React from "react";
import '../tabularview/tabularview.css'
import {getlocation} from "../service/dataservice";
import Openstreetmap from "../Openstreetmap";
import { Deletedata,Posthistory } from "../service/dataservice";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const handledelete = (data1) => {
        console.log(data1)
        Deletedata(data1.id).then((res)=> {
            console.log(res)
            gettabledata()
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

           let data ={
           action: "deleted",
           Place : data1.county,
           time : date
         }
         Posthistory(data).then((res)=> {
             console.log(res)
         }).catch((err)=>{
             console.log(err)
         })
        }).catch((err)=> {
            console.log(err)
        })
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
                            <td><button  onClick={() => handleedit(data)}><EditLocationAltIcon/></button><button onClick={()=> handledelete(data)}><DeleteIcon/></button><button onClick={() => handleedit(data)}>MAP VIEW</button></td> 
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