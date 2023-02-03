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
		<div className='mainTitle' style={{ display:'flex', position:'relative', flexDirection:"column", justifyContent:'flex-start', alignItems:'center', textAlign:'center', height:'94vh'}}>
        	
			<Typography variant='h1'>Find your next property in Real Estate</Typography><br/>
			<Typography variant='subtitle1' style={{color:'red'}}>This is merely a sample project.<br/> It was built using React on the frontend and Django in the backend.It stores the data in a PostGres DB<br/> For more, contact me: smmbonvalot@gmail.com</Typography>
			<Button variant='contained' size="large" style={{backgroundColor:'green', top:'200px'}}>All Properties</Button>
		</div>    
	</>
  )
}

export default Home