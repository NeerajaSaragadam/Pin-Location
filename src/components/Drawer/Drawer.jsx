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


const drawerWidth = 220;
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
//     console.log("minidrawer",props)
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   console.log("test",props.Draweritems)

// React.useEffect(()=>{
//   if(props.Draweritems==true){
//     setOpen(true);
//   } else if(props.Draweritems==false){
//     setOpen(false);
//   }
// },[props.Draweritems])

   return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Drawer variant="permanent" open={true}>
        <List>
         
            <ListItem button>
              <ListItemText primary= "Pinned Dashboard" />
            </ListItem>

            <ListItem button>
              <ListItemText primary= "Heat Map" />
            </ListItem>

           
        </List>
        
      </Drawer>
      
    </Box>
  );
}

export default MiniDrawer

 