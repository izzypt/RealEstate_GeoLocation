//React and react-router-dom
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// MUI
import { Button, Typography, TextField } from "@mui/material"
//COMPONENTS
import MainNavBar from './MainNavBar';
//CONTEXTS
import DispatchContext from '../Contexts/DispatchContext';
import StateContext from '../Contexts/StateContext';

function Login() {
    const [usernameValue, setUsernameValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
    const [token, setToken] = useState("")
    const GlobalDispatch = useContext(DispatchContext);
    const GlobalState = useContext(StateContext);
    const navigate = useNavigate()

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
            navigate("/")
            GlobalDispatch({type:'userLoggedIn'})
            console.log(GlobalState)
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
                return json
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
            {GlobalState.globalMessage}
        </>
    )
}

export default Login