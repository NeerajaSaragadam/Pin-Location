import axios  from "axios";



export const PinnedLocation = async (obj) => {
  let content = {
    headers : {
        "content-Type" : "application/json"
    },
}
let id = localStorage.getItem("token")
    console.log(obj)
    let response = await axios.post("http://localhost:3000/Locations1",
    obj,
    content
    )
    return response
  }

  export const getlocation = async () => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
     let response = await axios.get(`http://localhost:3000/Locations1?user=${id}`,content)
     return response
  }

  export const getaddress = async (x1,x2) => {

      let response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${x1}&lon=${x2}`)
      return response
  }

  export const getlocationdata = async () => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
      let response = await axios.get("http://localhost:3000/Locations1",content)
      return response
  }
  export const Posteditdata = async (obj,data) => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
    console.log(obj)
    let response = await axios.put(`http://localhost:3000/Locations1/${obj}`,
    data,
    content
    )
    return response
  }
  export const Deletedata = async (obj) => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
    console.log(obj)
    let response = await axios.delete(`http://localhost:3000/Locations1/${obj}`)
    return response
  }
  export const Posthistory = async (obj) => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
    let response = await axios.post("http://localhost:3000/history",
    obj,
    content
    )
    return response
  }

  export const PostAddHeat = async (obj) => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
    let response = await axios.post("http://localhost:3000/heatmap",obj,content)
    return response
  }
  export const GetAddHeat = async (obj) => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
    let response = await axios.get(`http://localhost:3000/heatmap?user=${id}`,content)
    return response
  }

  export const Postheatdata = async (data) => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
    let response = await axios.post("http://localhost:3000/heatmapdata",data,content)
    return response
  }

  export const Getheatdata = async () => {
    let content = {
      headers : {
          "content-Type" : "application/json"
      },
  }
  let id = localStorage.getItem("token")
    let response = await axios.get(`http://localhost:3000/heatmapdata?user=${id}`,content)
    return response
  }
