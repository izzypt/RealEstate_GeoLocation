import React, { useContext } from 'react'
import { AppBar, Typography, Icon } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import StateContext from '../Contexts/StateContext';
import LogoutIcon from '@mui/icons-material/Logout';

function MainNavBar() {
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)
  return (
    <AppBar position="static" style={{backgroundColor:'black'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant="h5" component="div" sx={{cursor: "pointer" }} onClick={() => {navigate("/")}}>
                RealEstate 
            </Typography>
            <div>
                <Button color="inherit" onClick={() => {navigate("/listings")}}>Listings</Button>
                <Button color="inherit">Agencies</Button>
            </div>
            <div>
                {GlobalState.userLoggedIn ? `Welcome ${GlobalState.userName}!` : true}
                <Button 
                    color="inherit" 
                    sx={{backgroundColor: 'green', color: 'white', marginLeft: '1rem', marginRight: '1rem', '&:hover': {backgroundColor: 'green'}}}
                >
                    Add Property
                </Button>
                {GlobalState.userLoggedIn ? 
                    <Button 
                        onClick={() => {navigate("/login")}} 
                        color="inherit" 
                        sx={{
                            backgroundColor: 'white', 
                            color: 'black', 
                            marginLeft: '1rem',
                            '&:hover': {backgroundColor: 'white'} 
                        }}
                    >
                        Login
                    </Button> : 
                    <Button 
                        sx={{backgroundColor: 'white'}} 
                    >
                        Logout<LogoutIcon/>
                    </Button>
                }
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default MainNavBar