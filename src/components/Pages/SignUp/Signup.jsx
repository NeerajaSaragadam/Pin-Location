import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import '../SignUp/signup.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Divider from "@mui/material/Divider";
import { UserSignup } from "../../service/userservice";
import {UserSignupPost,UserSignupPut } from "../../service/userservice";

const Signup = () =>{
    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;
    const NameRegex = /[A-Z]{1}[a-z]{2,}/;
    const [existemail,setexistemail] = useState([])
    const [findArray,setfindArray] = useState([])
    const [nameerror,setnameerror] = useState(false)
    const [namehelper,setnamehelper] = useState("")
    const [emailerror,setemailerror] = useState(false)
    const [emailhelper,setemailhelper] = useState("")
    const [passerror,setpasserror] = useState(false)
    const [passhelper,setpasshelper] = useState("")
    const [signupfeilds,setsignupfeilds] = useState({name:"",email:"",password:""})

   
    const takename = (event) => {
        setsignupfeilds({...signupfeilds,name:event.target.value})
    }
    const takeemail = (event) => {
        setsignupfeilds({...signupfeilds,email:event.target.value})
    }
    const takepassword = (event) => {
        setsignupfeilds({...signupfeilds,password:event.target.value})
    }

    const getsignup = () =>{
        UserSignup().then(function(response){
            setfindArray(response.data)
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
    }
    // const checkEmail = (serverdata,formdata) =>{
    //     const user = serverdata.find(user => user.email === formdata.email);

    //     if(user) {
    //        setexistemail(user)
    //     }
       
    // }
    
    const onsubmit = () => {
        if(NameRegex.test(signupfeilds.name)){
            setnameerror(false)
            setnamehelper("")
        }else{
            setnameerror(true)
            setnamehelper("enter correct name")
        }
        if(emailRegex.test(signupfeilds.email)){
            setemailerror(false)
            setemailhelper("")
        }else{
            setemailerror(true)
            setemailhelper("enter correct email")
        }
        if(passwordRegex.test(signupfeilds.password)){
            setpasserror(false)
            setpasshelper("")
        }else{
            setpasserror(true)
            setpasshelper("enter correct password")
        }
        if(emailRegex.test(signupfeilds.email) && passwordRegex.test(signupfeilds.password) && NameRegex.test(signupfeilds.name)) {
            // checkEmail(findArray,signupfeilds)
            // console.log(existemail)

            var findArray1 = findArray.find((user)=>((signupfeilds.email == user.email)))

            console.log(findArray1)
            if(findArray1){
                // let findg = findArray1.includes(findArray1.googleid)
                // console.log(findg)
              var fingg = "googleid" in findArray1
              var findp = "password" in findArray1
                if(fingg && !findp){
                  var data = {
                        name  : signupfeilds.name,
                        email : findArray1.email,
                        password : signupfeilds.password,
                        googleid : findArray1.email
                    }
                    UserSignupPut(findArray1.id,data).then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    })
                }else{
                    alert("already email exist")
                }
            } 
            else {
                console.log("email not found")
                 UserSignupPost(signupfeilds).then(function(response){
                console.log("post",response)
             }).catch((err)=>{
                console.log(err)
             })
            }
    }
}
React.useEffect(()=>{
    getsignup()

},[])

    return(
        <div className="main-header">
             <div className="header">
            <h4 className="signupfeild">SignUp</h4>
            <div className="namefeild">
                <label className="namelabel">Name</label>
                <TextField id="outlined-basic" className="Nametext" onChange={takename} error={nameerror} helperText={namehelper} label="Name" variant="outlined" size="small" style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",marginLeft:"78px"}}/>
            </div>
            <div className="emailfeild">
                <label className="emaillabel">Email</label>
                <TextField id="outlined-basic" className="emailtext" onChange={takeemail} error={emailerror} helperText={emailhelper} label="Email" variant="outlined" size="small" style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",marginLeft:"84px"}}/>
            </div>
            <div className="passwordfeild">
                <label className="passlabel">Password</label>
                <TextField id="outlined-basic" className="passtext" onChange={takepassword} error={passerror} helperText={passhelper}  label="Password" variant="outlined" size="small" style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",marginLeft:"55px"}}/>
            </div>
            <div className="btndiv">
            <Button variant="contained" onClick={onsubmit} className="btnsign1">Signup</Button>
            {/* <Link to="#">
                <p>Already have an account?SignIn</p>
            </Link> */}
            <a href="/"><p className="alreadysignin">Already have an account?SignIn</p></a>
            </div>
                    
            <div className="row5">
            <Divider style={{ marginTop: "1.5vw", marginBottom: "1.5vw",width: "450px",marginLeft:"80px" }}>
              OR
            </Divider>
          </div>
          <div className="googlebtn">
          <Button variant="contained" className="btnsign">SignIn With Google</Button>
          </div>

        </div>

        </div>
       
    )
}

export default Signup