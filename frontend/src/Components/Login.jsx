//React and react-router-dom
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// MUI
import { Card, CardHeader, Button, Typography, TextField, Snackbar } from "@mui/material"
//COMPONENTS
import MainNavBar from './MainNavBar';
//CONTEXTS
import DispatchContext from '../Contexts/DispatchContext';
import StateContext from '../Contexts/StateContext';

function Login() {
    const [usernameValue, setUsernameValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
    const [token, setToken] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false);
    const GlobalDispatch = useContext(DispatchContext);
    const GlobalState = useContext(StateContext);
    const navigate = useNavigate()

    const LogmeIn = () => {
		fetch('http://127.0.0.1:8000/api-auth/token/login/', {
 			method: "POST",
			body: JSON.stringify({
				username: usernameValue,
				password: passwordValue,
			}),
			headers: {"Content-type": "application/json; charset=UTF-8"}
		}).then(response => response.json()) 
		.then(data => {
            setToken(data.auth_token)
            GlobalDispatch({type:'catchToken', tokenValue: data.auth_token})
        })
		.catch(err => console.log(err));
    }

    useEffect(() => {
        if (token) {
            getUserInfo().then(navigate("/"))
            console.log(GlobalState)
        }
    }, [token])

    const getUserInfo = async () => {
        fetch('http://127.0.0.1:8000/api-auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': 'Token '.concat(token),
            }}).then(response => response.json())
            .then(json => {
                GlobalDispatch({type:'catchUserInfo', userInfo: json})
                return json
            })
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
      };

    return (
        <>
            <MainNavBar/>
            <div style={{display:"flex", justifyContent:"center", alignText:'center', marginTop:'3rem'}}>
                <Card 
                        variant="outlined"
                        sx={{maxWidth:"55%", minWidth: "55%", padding:'5rem'}}
                >
                    <CardHeader title="Login" sx={{textAlign:'center'}}/>
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
                        <div style={{textAlign:'center'}}>
                            <Typography variant='small' sx={{marginTop: "15px", textAlign:"center"}} > Don't have an account ? <Link to="/Register"><span style={{cursor: "pointer", color: "blue"}}>Register here</span></Link></Typography>
                        </div>
                        <Snackbar
                            open={dialogOpen}
                            autoHideDuration={6000}
                            onClose={handleDialogClose}
                            message="Login Successfull"
                            severity="success"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        />
                </Card>
            </div>
        </>
    )
}

export default Login