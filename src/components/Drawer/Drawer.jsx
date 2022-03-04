import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../Drawer/Drawer.css'
import { GetAddHeat } from '../service/dataservice';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


const drawerWidth = 200;
 const margin = 55;

const openedMixin = (theme) => ({
  width: drawerWidth,
  marginTop: margin,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    marginTop: margin,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

 function MiniDrawer(props) {
   const [heatdata,setheatdata] = React.useState([])
  const getheatmap = () => {
    props.Listentominidrawer(false)
  }

  const getPinmap = () => {
    props.Listentopindash(true)
  }

  const getaddheatmap = () => {
    GetAddHeat().then((res)=> {
  
      setheatdata(res.data)
    }).catch((err)=> {  
      console.log(err)
    })
  }

  const showheatmapname = (data)=> {
    console.log(data)
    props.Listentoaddheatmap(data)
  }
 

  React.useEffect(()=> {
    getaddheatmap()
  },[heatdata])

 

   return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Drawer variant="permanent" open={true}>
        <List>
         
            <ListItem button onClick={getPinmap}>
              <ListItemText primary= "Pinned Dashboard" />
            </ListItem>

            <ListItem button onClick={getheatmap}>
              <ListItemText primary= "Heat Map" />
            </ListItem>

            {/* {
              heatdata.map((city) => 
              <ListItem>
               <KeyboardDoubleArrowRightIcon/>
               <ListItemText primary="city.heatmap"/>
              </ListItem>
              )
            } */}

          {/* <List> */}
          {heatdata.map((text, index) => (
            <ListItem button >
              <ListItemIcon>
              <KeyboardDoubleArrowRightIcon/>
              </ListItemIcon>
              <ListItemText primary={text.heatmap} key={index} onClick = {() => showheatmapname(text.heatmap)}/>
            </ListItem>
          ))}
        {/* </List> */}

           
        </List>
        
      </Drawer>
      
    </Box>
  );
}

export default MiniDrawer

 