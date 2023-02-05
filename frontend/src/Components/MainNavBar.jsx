import React, { useContext, useState } from 'react'
import { Toolbar, AppBar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StateContext from '../Contexts/StateContext';
import DispatchContext from '../Contexts/DispatchContext';
import Person2Icon from '@mui/icons-material/Person2';
import Axios from 'axios';

function MainNavBar() {
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)
    const GlobalDispatch = useContext(DispatchContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const openProfileMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const closeProfileMenu = () => {
      setAnchorEl(null);
    };
    const logMeOut = async () => {
        setAnchorEl(null);
        console.log(GlobalState.userToken)
        const confirmedLogOut = window.confirm("Are you sure you want to logout?")
        if (confirmedLogOut){
            const response = await Axios.post('http://127.0.0.1:8000/api-auth/token/logout/', GlobalState.userToken,
                {
                    headers: {
                        'Authorization': 'Token '.concat(GlobalState.userToken),
                        'Content-Type': 'application/json',
                    }
                })
            GlobalDispatch({type:'userLoggedOut'})
            navigate("/")
        }
    };
  return (
    <AppBar position="static" style={{backgroundColor:'black'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant="h5" component="div" sx={{cursor: "pointer", fontWeight: 600}} onClick={() => {navigate("/")}}>
                RealEstate 
            </Typography>
            <div>
                <Button color="inherit" sx={{fontWeight: 600}} onClick={() => {navigate("/listings")}}>Listings</Button>
                <Button color="inherit" sx={{fontWeight: 600}} >Agencies</Button>
            </div>
            <div>
                {GlobalState.userLoggedIn ? 
                <>
                    <IconButton
                        onClick={openProfileMenu}  
                        sx={{ 
                            backgroundColor: 'inherit',
                            marginLeft: '0.5rem',
                            "&:hover": {backgroundColor: "inherit"}
                        }}
                    >
                        <Person2Icon 
                            fontSize="large" 
                            color='success'
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={closeProfileMenu}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={closeProfileMenu}>Profile</MenuItem>
                            <MenuItem onClick={closeProfileMenu}>My account</MenuItem>
                            <MenuItem onClick={logMeOut}>Logout</MenuItem>
                        </Menu>
                    </IconButton>
                    <Typography level="body1" component={"span"} fontWeight={600} sx={{margin:'1rem'}}>Welcome {GlobalState.userName}!</Typography>
                    <Button 
                        color="inherit" 
                        sx={{backgroundColor: 'green', fontWeight: 600, color: 'white', marginLeft: '1rem', marginRight: '1rem', '&:hover': {backgroundColor: 'green'}}}

                    >
                    Add Property
                    </Button>
                </>:
                    <Button 
                        onClick={() => {navigate("/login")}} 
                        color="inherit" 
                        sx={{
                            backgroundColor: 'white', 
                            color: 'black', 
                            marginLeft: '1rem',
                            '&:hover': {backgroundColor: 'white'},
                            fontWeight:'700'
                        }}
                    >
                        Login 
                    </Button>
                }
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default MainNavBar