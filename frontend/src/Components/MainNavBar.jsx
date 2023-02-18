import React, { useContext, useState, useEffect } from 'react'
import { Box, Toolbar, AppBar, Typography, Button, Menu, MenuItem, IconButton, useMediaQuery, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'
import StateContext from '../Contexts/StateContext';
import DispatchContext from '../Contexts/DispatchContext';
import Person2Icon from '@mui/icons-material/Person2';
import Axios from 'axios';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function MainNavBar() {
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)
    const GlobalDispatch = useContext(DispatchContext)
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
	const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
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

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		  return;
		}
	
		setDrawerOpen(open);
	  };

	const drawerList = (anchor) => (
		<Box
		  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
		  role="presentation"
		  onClick={toggleDrawer(false)}
		  onKeyDown={toggleDrawer(false)}
		>
			{
				GlobalState.userLoggedIn ? <p style={{padding:'0.5rem', margin:'0.5em', textAlign:'center', backgroundColor:'black', color:'white'}}>Welcome {GlobalState.userName}!</p> : null
			}
			<List>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {navigate("/")}}
					>
						<ListItemIcon >
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary={"Home"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {navigate("/listings")}}
					>
						<ListItemIcon >
							<ListIcon />
						</ListItemIcon>
						<ListItemText primary={"Listings"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {navigate("/Agencies")}}
					>
						<ListItemIcon >
							<WorkIcon />
						</ListItemIcon>
						<ListItemText primary={"Agencies"} />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {navigate("/addproperty")}}
					>
						<ListItemIcon >
							<AddHomeWorkIcon />
						</ListItemIcon>
						<ListItemText primary={"Add Property"} />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<ListItem disablePadding>
				<ListItemButton
					onClick={() => {navigate("/myProfile")}}
				>
					<ListItemIcon >
						<AccountBoxIcon />
					</ListItemIcon>
					<ListItemText primary={"Profile"} />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton
					onClick={() => {GlobalState.userLoggedIn ? logMeOut() : navigate("/login")}}

				>
					<ListItemIcon >
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText primary={GlobalState.userLoggedIn ? "Logout" : 'Login'} />
				</ListItemButton>
			</ListItem>
		</Box>
	  );
	
  return (
    <>
    {isSmallScreen ? 
	(
		/* ---> MOBILE/SMALL SCREEN NAVBAR <---*/
		<Box sx={{ flexGrow: 1 }}>
			<AppBar 
				position="static" 
				style={{backgroundColor:'black'}}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography 
						variant="h6" 
						component="div" 
						sx={{ flexGrow: 1 }}
					>
						RealEstate
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor={"left"}
				open={drawerOpen}
				onClose={toggleDrawer("left", false)}
			>
				{drawerList("left")}
          </Drawer>
		</Box> 
	)
	: 
    (
        <>
			{/* ---> DESKTOP NAVBAR <---*/}
            <AppBar position="static" style={{backgroundColor:'black'}}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography 
                    variant="h5" 
                    component="div" 
                    sx={{
						cursor: "pointer", 
                		fontWeight: 600
					}} 
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
        </>
    ) }
    </>
)
}

export default MainNavBar