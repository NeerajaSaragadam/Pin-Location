import axios  from "axios";

let content = {
    headers : {
        "content-Type" : "application/json"
    },
}
let id = localStorage.getItem("token")

export const PinnedLocation = async (obj) => {
    console.log(obj)
    let response = await axios.post("http://localhost:3000/Locations1",
    obj,
    content
    )
    return response
  }

  export const getlocation = async () => {
     let response = await axios.get(`http://localhost:3000/Locations1?user=${id}`,content)
     return response
  }

  export const getaddress = async (x1,x2) => {
      let response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${x1}&lon=${x2}`)
      return response
  }

  export const getlocationdata = async () => {
      let response = await axios.get("http://localhost:3000/Locations1",content)
      return response
  }