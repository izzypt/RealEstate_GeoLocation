import React from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material"
import { useState } from 'react';
import MainNavBar from './MainNavBar';
import { Link } from 'react-router-dom';

function Login() {
  return (
	<>
        <MainNavBar/>
		<Typography variant='h2' align='center' marginY={"15px"}>Login</Typography>
		<div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: '3rem', top:"10%", border: '4px solid black', margin: "auto", width: "50%"}}>
			<TextField fullWidth label="Username" variant="outlined" sx={{ m: 1 }} /><br/>
			<TextField fullWidth type='password' label="Password" variant="outlined" sx={{ m: 1 }} /><br/>
			<Button fullWidth type='submit' variant="contained" sx={{ m: 1 }} color={'success'}>LOGIN</Button>
			<Typography variant='small' sx={{marginTop: "15px"}} > Don't have an account ? <Link to="/Register"><span style={{cursor: "pointer", color: "blue"}}>Register here</span></Link></Typography>
		</div>
	</>
  )
}

export default Login