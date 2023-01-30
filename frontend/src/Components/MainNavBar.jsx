import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function MainNavBar() {
    const navigate = useNavigate()
  return (
    <AppBar position="static" style={{backgroundColor:'black'}}>
        <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => {navigate("/")}}>
                RealEstate 
            </Typography>
            <div style={{marginLeft: 'auto', marginRight: '45rem'}}>
                <Button color="inherit">Listings</Button>
                <Button color="inherit">Agencies</Button>
            </div>
            <div>
                <Button color="inherit" sx={{backgroundColor: 'green', color: 'white', marginRight: '1rem', '&:hover': {backgroundColor: 'green'}}}>Add Property</Button>
                <Button onClick={() => {navigate("/login")}} color="inherit" sx={{backgroundColor: 'white', color: 'black', marginLeft: '1rem','&:hover': {backgroundColor: 'white'} }}>Login</Button>
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default MainNavBar