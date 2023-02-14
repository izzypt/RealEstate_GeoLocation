import React from 'react'
import { Card, CardHeader, Button, Typography, TextField } from "@mui/material"
import { useState } from 'react';
import MainNavBar from './MainNavBar';
import { Link } from 'react-router-dom';
import Login from './Login';

function Register() {
	const [usernameValue, setUsernameValue] = useState("")
	const [emailValue, setEmailValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
	const [password2Value, setPassword2Value] = useState("")

	const registerMe = () => {
		console.log("I want to get registered")
		fetch('http://127.0.0.1:8000/api-auth/users/', {
 			method: "POST",
			body: JSON.stringify({
				username: usernameValue,
				email: emailValue,
				password: passwordValue,
				re_password: password2Value
			}),
			headers: {"Content-type": "application/json; charset=UTF-8"}
		}).then(response => response.json()) 
		.then(json => console.log(json))
		.catch(err => console.log(err));
	};
	return (
	<>
		<MainNavBar/>
		<div style={{display:"flex", justifyContent:"center", alignText:'center', marginTop:'3rem'}}>
			<Card 
				variant="outlined"
				sx={{maxWidth:"55%", minWidth: "55%", padding:'5rem'}}
			>
				<CardHeader title="Register" subheader="Create a new account" sx={{textAlign:'center'}}/>
				<TextField 
					variant="outlined" 
					fullWidth 
					label="Username"
					value={usernameValue} 
					onChange={(e) => setUsernameValue(e.target.value)}
					sx={{ m: 1 }} 
				/><br/>
				<TextField 
					fullWidth 
					label="E-mail" 
					variant="outlined"
					value={emailValue} 
					onChange={(e) => setEmailValue(e.target.value)} 
					sx={{ m: 1 }} 
				/><br/>
				<TextField 
					fullWidth 
					type='password' 
					label="Password" 
					variant="outlined"
					value={passwordValue} 
					onChange={(e) => setPasswordValue(e.target.value)}  
					sx={{ m: 1 }} 
				/><br/>
				<TextField 
					fullWidth 
					type='password' 
					label="Confirm Password" 
					value={password2Value} 
					onChange={(e) => setPassword2Value(e.target.value)}  
					variant="outlined" 
					sx={{ m: 1 }} 
				/><br/>
				<Button 
					fullWidth 
					type='submit' 
					variant="contained" sx={{ m: 1 }} 
					color={'success'} 
					onClick={() => registerMe()}
				> Register
				</Button>
				<div style={{textAlign:'center'}}>
					<Typography 
						variant='small' 
						sx={{marginTop: "15px"}}
					> 
						Already have an account ? <Link to="/Login"><span style={{cursor: "pointer", color: "blue"}}>Sign in</span></Link>
					</Typography>
				</div>
			</Card>
		</div>
	</>
	)
}

export default Register