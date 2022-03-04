import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import {PinnedLocation,getlocation,getaddress} from '../components/service/dataservice';
import { PinnedLocation,Posteditdata,getlocation,Posthistory } from '../service/dataservice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  console.log(props)
 
const [place,setplace] = React.useState("")
const [open,setopen] = React.useState(true)

const takeplace = (e) => {
  setplace(e.target.value);
  props.Listentoplace(place)
 
}
  const handlesave = () => {
    if(props.editmapdata > 0){
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

     let data ={
       action: "edited",
       Place : props.edithistory,
       time : date
     }
     Posthistory(data).then((res)=> {
       console.log(res)
       Posteditdata(props.editmapdata,props.locationdata).then((res)=>{
        console.log(res)
        // props.getlocationdata()
        setopen(false)
        props.Listentoopen(false)
        getlocation().then((res) => {

        }).catch((err)=> {
          console.log(err)
        })
      }).catch((err)=>{
        console.log(err)
      })

     }).catch((err)=> {
       console.log(err)
     })
      
     
    } else {
            console.log("testingg")
         PinnedLocation(props.locationdata).then((res)=> {
                        console.log(res)
                        props.getlocationdata()
                        setopen(false)
                        props.Listentoopen(false)
                    }).catch((err)=>{
                        console.log(err)
                    })
                  }
  }
 
  React.useEffect(()=>{
    props.getlocationdata()
  })
  

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            enter the place
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{display:"flex",flexDirection:"column"}}>
            <input type="text" onChange={takeplace}  />
            <button onClick={handlesave} style={{width:"60px",marginTop:"20px"}}>Save</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
