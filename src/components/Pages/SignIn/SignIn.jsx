import React from "react";
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import '../SignUp/signup.css'
import Button from '@mui/material/Button';
import { Link,useHistory } from 'react-router-dom';
import Divider from "@mui/material/Divider";
import { UserSignup,UserSignupPost } from "../../service/userservice";
import {GoogleLogin} from 'react-google-login'




const SignIn = () =>{
    const [signinfeilds,setsigninfeilds] = React.useState({email:"",password:""})
    const [filterArray,setfilterArray] = React.useState([])
    const [success,setsuccess] = React.useState([])

    let history = useHistory();

   
    const takeemail = (event) => {
        setsigninfeilds({...signinfeilds,email: event.target.value})
    }
    const takepassword = (event) => {
        setsigninfeilds({...signinfeilds, password: event.target.value})
    }
    const getsignup = () => {
        UserSignup().then((response)=>{
            console.log(response)
            setfilterArray(response.data)
        }).catch((err) => {
            console.log(err)
        }) 
    }
    const onsubmit = () => {
        console.log(signinfeilds.email, signinfeilds.password)
        let findArray = filterArray.find((user)=>((signinfeilds.email == user.email) && (signinfeilds.password == user.password)))
         
        console.log("test",findArray)
      
        if(findArray){
            alert("success login")
            localStorage.setItem("token",findArray.email)
            history.push('/Dashboard');
        } else {
            alert("invalid username and Password")
        }

    }
    const  responseGoogle1 =  response => {
        let data = {
            email : response.profileObj.email,
            googleid : response.profileObj.googleId
        }
        console.log(response)
        let findArray1 = filterArray.find((user)=> (response.profileObj.email == user.email))
        console.log(findArray1)
        if(findArray1){
          localStorage.setItem("token",findArray1.email)
            const gettoken = localStorage.getItem("token")
            if(gettoken){
                history.push('/Dashboard');
            }
            else {
                history.push('/')
            }
          
        }
        else {
            UserSignupPost(data).then((res)=>{
                console.log(res)
                localStorage.setItem("token",res.data.email)
                const gettoken = localStorage.getItem("token")
                if(gettoken){
                    history.push('/Dashboard');
                }
                else {
                    history.push('/')
                }
                
            }).catch((err)=> {
                console.log(err)
            })
        }
       // history.push('/Dashboard');
    }
    const responseGoogle = response => {
        console.log(response)
    }
   

    React.useEffect(()=>{
        getsignup()
    },[])
  
    return(
        <div className="main-header">
             <div className="header">
            <h4 className="signupfeild">SigIn</h4>
            <div className="emailfeild">
                <label className="emaillabel">Email</label>
                <TextField id="outlined-basic" className="emailtext" onChange={(event)=>  setsigninfeilds({...signinfeilds,email: event.target.value})} label="Email" variant="outlined" size="small" style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",marginLeft:"84px"}}/>
            </div>
            <div className="passwordfeild">
                <label className="passlabel">Password</label>
                <TextField id="outlined-basic" className="passtext" onChange={(event) => setsigninfeilds({...signinfeilds, password: event.target.value}) }  label="Password" variant="outlined" size="small" style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",marginLeft:"55px"}}/>
            </div>
            <div className="btndiv">
            <Button variant="contained" onClick={onsubmit} className="btnsign1">SignIn</Button>
            {/* <Link to="#">
                <p>Already have an account?SignIn</p>
            </Link> */}
            <a href="/Signup"><p className="alreadysignin">Don't have an account?Signup</p></a>
            </div>
                    
            <div className="row5">
            <Divider style={{ marginTop: "1.5vw", marginBottom: "1.5vw",width: "450px",marginLeft:"80px" }}>
              OR
            </Divider>
          </div>
          <div className="googlebtn">
          {/* <Button variant="contained" className="btnsign">Google</Button> */}
          {/* <GoogleLogin
          clientId="664121231611-nuqad3rg499oasuu3p86rafufbrh2h89.apps.googleusercontent.com"
          onSuccess={responseGoogle1}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          redirectUri='http://localhost:3001/Dashboard'
          />
           */}
             <GoogleLogin
               clientId="664121231611-nuqad3rg499oasuu3p86rafufbrh2h89.apps.googleusercontent.com"
               render = {renderProps => (
                   <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{border:"none",outline:"none"}} >
                      <Button variant="contained" className="btnsign">Signin with Google</Button>
                   </button>
               )}
               onSuccess={responseGoogle1}
               onFailure={responseGoogle}
               cookiePolicy={'single_host_origin'}
                 />
          </div>

        </div>

        </div>
       
    )
}

export default SignIn