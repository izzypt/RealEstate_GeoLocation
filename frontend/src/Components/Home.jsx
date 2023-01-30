import React from 'react'
import './Home.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import bridge_night from '../assets/bridge_night.jpg'
import MainNavBar from './MainNavBar';

function Home() {
  return (
    <>
		<MainNavBar/>
		<div style={{ display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
        	<img src={bridge_night} style={{ width:"100%", height:"94vh" }}/>
			<Typography variant='h1' className='mainTitle' align='center'>Find your next property in Real Estate</Typography>
			<Button variant='contained' size="large" style={{position:'absolute', top:'350px', backgroundColor:'green'}}>All Properties</Button>
		</div>    
	</>
  )
}

export default Home