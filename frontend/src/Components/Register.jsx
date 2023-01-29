import React from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material"
import { useState } from 'react';


function Register() {
	const [buttonColor, setButtonColor] = useState("success")
	return (
	<>
		<Typography variant='h1'>Register here</Typography>
		<TextField id="outlined-basic" label="Username" variant="outlined" sx={{ m: 1 }} /><br/>
		<TextField id="outlined-basic" label="e-mail" variant="outlined" sx={{ m: 1 }} /><br/>
		<TextField id="outlined-basic" label="Password" variant="outlined" sx={{ m: 1 }} /><br/>
		<TextField id="outlined-basic" label="Confirm Password" variant="outlined" sx={{ m: 1 }} /><br/>
		<Button variant="contained" sx={{ m: 1 }} color={buttonColor} onClick={() => setButtonColor('error')}>Register</Button>
	</>
	)
}

export default Register