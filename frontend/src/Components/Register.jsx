import React from 'react'
import { Card, CardHeader, Button, Typography, TextField, Snackbar } from "@mui/material"
import { useState } from 'react';
import MainNavBar from './MainNavBar';
import { Link } from 'react-router-dom';
import Login from './Login';
import debounce from '../utils/helpers'

function Register() {
	const [usernameValue, setUsernameValue] = useState("")
	const [emailValue, setEmailValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
	const [password2Value, setPassword2Value] = useState("")
	const [dialogOpen, setDialogOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [validateFields, setValidateFields] = useState({
		usernameField: false,
        emailField: false,
        passwordField: false,
        password2Field: false
    });

	const handleDialogClose = () => {
        setDialogOpen(false);
	};

	function validateInputFields() {
		if (usernameValue === "" || emailValue === "" || passwordValue === "" || password2Value === "") {
            throw new Error('Please fill in all fields');
        } 
		else if (passwordValue !== password2Value) {
			throw new Error('Passwords do not match');
		}
		else {
            return true;
        }
	}

	const registerMe = async () => {
		try {
			validateInputFields()
			await fetch('http://127.0.0.1:8000/api-auth/users/', {
				method: "POST",
				body: JSON.stringify({
					username: usernameValue,
					email: emailValue,
					password: passwordValue,
					re_password: password2Value
				}),
				headers: {"Content-type": "application/json; charset=UTF-8"}
			}).then(res => {
				if (res.status === 201)
				{
					setSnackbarMessage("Registered account successfully");
					setDialogOpen(true)
				}
				else {
					setSnackbarMessage("Registration failed");
					setDialogOpen(true)
                }
				})
		} catch (error) {
			setSnackbarMessage(error.message);
            setDialogOpen(true)
        }
	}

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
						onChange={(e) => {
							if (e.target.value.length === 0)
								setValidateFields({...validateFields, usernameField: true})
							else
							
                                setValidateFields({...validateFields, usernameField: false})
							setUsernameValue(e.target.value)
						}}
						sx={{ m: 1 }} 
						error={validateFields.usernameField}
						helperText={validateFields.usernameField ? "Username is required" : ""}
					/><br/>
					<TextField 
						fullWidth 
						label="E-mail" 
						variant="outlined"
						value={emailValue} 
						onChange={(e) => {
							if (e.target.value.length === 0)
								setValidateFields({...validateFields, emailField: true})
							else
							
                                setValidateFields({...validateFields, emailField: false})
							setEmailValue(e.target.value)
						}}  
						sx={{ m: 1 }} 
						error={validateFields.emailField}
						helperText={validateFields.emailField ? "E-mail is required" : ""}
					/><br/>
					<TextField 
						fullWidth 
						type='password' 
						label="Password" 
						variant="outlined"
						value={passwordValue} 
						onChange={(e) => {
							if (e.target.value.length === 0)
								setValidateFields({...validateFields, passwordField: true})
							else
							
                                setValidateFields({...validateFields, passwordField: false})
							setPasswordValue(e.target.value)
						}}  
						sx={{ m: 1 }} 
						error={validateFields.passwordField}
						helperText={validateFields.passwordField ? "Password is required" : ""}
					/><br/>
					<TextField 
						fullWidth 
						type='password' 
						label="Confirm Password" 
						value={password2Value} 
						onChange={(e) => {
							if (e.target.value.length === 0)
								setValidateFields({...validateFields, password2Field: true})
							else
							
                                setValidateFields({...validateFields, password2Field: false})
							setPassword2Value(e.target.value)
						}}  
						variant="outlined" 
						sx={{ m: 1 }} 
						error={validateFields.password2Field}
						helperText={validateFields.password2Field? "Password2 is required" : ""}
					/><br/>
					<Button 
						fullWidth 
						type='submit' 
						variant="contained" sx={{ m: 1 }} 
						color={'success'} 
						onClick={debounce(registerMe, 1000)}
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
				<Snackbar
					open={dialogOpen}
					autoHideDuration={5000}
					onClose={handleDialogClose}
					message={snackbarMessage}
					severity="success"
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				/>
			</div>
		</>
	)
}

export default Register