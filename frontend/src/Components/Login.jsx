import React from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material"
import { useState } from 'react';
import MainNavBar from './MainNavBar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
    const [usernameValue, setUsernameValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
    const [token, setToken] = useState("")

    const LogmeIn = () => {
        console.log("Please log me in, Sir, as ", usernameValue, passwordValue)
		fetch('http://127.0.0.1:8000/api-auth/token/login/', {
 			method: "POST",
			body: JSON.stringify({
				username: usernameValue,
				password: passwordValue,
			}),
			headers: {"Content-type": "application/json; charset=UTF-8"}
		}).then(response => response.json()) 
		.then(data => {
            console.log(data)
            setToken(data.auth_token)
        })
		.catch(err => console.log(err));
    }

    useEffect(() => {
        if (token) {
            console.log("token value is ", token)
            getUser()
        }
    }, [token])

    const getUser = () => {
        fetch('http://127.0.0.1:8000/api-auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': 'Token '.concat(token),
            }}).then(response => response.json())
            .then(json => {
                console.log(json)
            })
    }

    return (
        <>
            <MainNavBar/>
            <Typography variant='h2' align='center' marginY={"15px"}>Login</Typography>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: '3rem', top:"10%", border: '4px solid black', margin: "auto", width: "50%"}}>
                <TextField 
                    fullWidth 
                    label="Username" 
                    variant="outlined" 
                    value={usernameValue} 
                    onChange={(e) => setUsernameValue(e.target.value)}
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
                <Button 
                    fullWidth 
                    variant="contained" 
                    type='submit' 
                    color={'success'}
                    sx={{ m: 1 }} 
                    onClick={LogmeIn}
                >LOGIN</Button>
                <Typography variant='small' sx={{marginTop: "15px"}} > Don't have an account ? <Link to="/Register"><span style={{cursor: "pointer", color: "blue"}}>Register here</span></Link></Typography>
            </div>
        </>
    )
}

export default Login