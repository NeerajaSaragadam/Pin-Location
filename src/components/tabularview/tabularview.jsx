import React from "react";
import '../tabularview/tabularview.css'
import {getlocation} from "../service/dataservice";

const Tabledata = (props) => {
    console.log(props)
    const [tabledata,settabledata] = React.useState([])
    const gettabledata = () => {
        getlocation().then((res) => {
            console.log(res)
            settabledata(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    console.log(tabledata)

    const handleedit = () => {
        console.log("testing")
      props.Listentoedit(true)
    }

    React.useEffect(()=> {
        gettabledata()
    },[])
    return(
        <div className="tabledata">
            <table>
                <tbody>
                    <tr>
                        <th>City</th>
                        <th>State</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th colSpan="1">Map view</th>
                    </tr>
                   
                        {
                             tabledata.map((data) => 
                             <tr>
                            <td>{data.county}</td>
                            <td>{data.state}</td>
                            <td>{data.lat}</td>
                            <td>{data.lng}</td>
                            <td><button onClick={handleedit}>edit</button><button>delete</button><button>map view</button></td> 
                            </tr>)
                       }
                </tbody>
            </table>

        </div>
    )
}

export default Tabledata