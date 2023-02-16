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
    const handleClick = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log("close menu")
        setAnchorEl(null);
        console.log(anchorEl)
    };

    const logMeOut = async () => {
        const confirmedLogOut = window.confirm("Are you sure you want to logout?")
        if (confirmedLogOut){
            handleClose()
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
            <Typography 
                variant="h5" 
                component="div" 
                sx={{cursor: "pointer", 
                fontWeight: 600}} 
                onClick={() => {navigate("/")}}
            >
                RealEstate 
            </Typography>
            <div>
                <Button 
                    color="inherit" 
                    sx={{fontWeight: 600}} 
                    onClick={() => {navigate("/listings")}}
                >
                    Listings
                </Button>
                <Button 
                    color="inherit" 
                    sx={{fontWeight: 600}} 
                    onClick={() => {navigate("/Agencies")}}
                >
                    Agencies
                </Button>
            </div>
            <div>
                {GlobalState.userLoggedIn ? 
                <>
                    {/* User Icon*/}
                    <IconButton
                        id="basic-button"
                        onClick={handleClick}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}                
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
                    </IconButton>
                    {/* Menu */}
                    <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                        <MenuItem
                            onClick={() => {
                                navigate("/myProfile")
                                handleClose()
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem 
                            onClick={logMeOut}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                    <Typography 
                        level="body1" 
                        component={"span"} 
                        fontWeight={600} 
                        sx={{margin:'1rem'}}
                    >
                        Welcome {GlobalState.userName}!
                    </Typography>
                    <Button 
                        color="inherit" 
                        onClick={() => {navigate("/addproperty")}}
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