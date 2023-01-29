import React from 'react'
import './Home.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import bridge_night from '../assets/bridge_night.jpg'


function Home() {
  return (
    <>
        <AppBar position="static" style={{backgroundColor:'black'}}>
			<Toolbar>
				<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
				RealEstate
				</Typography>
				<div style={{marginLeft: 'auto', marginRight: '45rem'}}>
					<Button color="inherit">Listings</Button>
					<Button color="inherit">Agencies</Button>
				</div>
				<div>
					<Button color="inherit" sx={{backgroundColor: 'green', color: 'white', marginRight: '1rem', '&:hover': {backgroundColor: 'green'}}}>Add Property</Button>
					<Button color="inherit" sx={{backgroundColor: 'white', color: 'black', marginLeft: '1rem','&:hover': {backgroundColor: 'white'} }}>Login</Button>
				</div>
			</Toolbar>
    	</AppBar>
		<div style={{ display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
        	<img src={bridge_night} style={{ width:"100%", height:"93vh" }}/>
			<Typography variant='h1' className='mainTitle' align='center'>Find your next property in Real Estate</Typography>
			<Button variant='contained' size="large" style={{position:'absolute', top:'350px', backgroundColor:'green'}}>All Properties</Button>
		</div>    
	</>
  )
}

export default Home