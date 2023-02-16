//React
import react, { useReducer, useState, useContext, useEffect } from "react";
//MUI
import { Box, Grid, Card, CardMedia, CardContent, CardActions,  InputAdornment , TextField, Button, Tooltip , Divider, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import anonymous_user from '../assets/anonymous_user.png'
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
//Components
import MainNavBar from './MainNavBar';
//Context
import StateContext from "../Contexts/StateContext";

function Profile() {
	const [agencyName, setAgencyName] = useState('');
	const [phone, setPhone] = useState('');
	const [bio, setBio] = useState('');
	const [image, setImage] = useState(null);
	const [avatar, setAvater] = useState(null);
	const GlobalState = useContext(StateContext);

	const handleChange = (event) => {
		switch(event.target.name){
			case 'agencyName':
				setAgencyName(event.target.value);
				break;
			case 'phone':
				setPhone(event.target.value);
                break;
            case 'bio':
				setBio(event.target.value);
				break;
			case 'image':
				setImage(event.target.files);
                break;
		}
	};

	const getuserProfile = async () => {
		const response = await fetch(`http://127.0.0.1:8000/profiles/${GlobalState.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GlobalState.token}`
            }
        }).then(res => res.json()).then(res => {
			console.log("Got user info", res)
			setAgencyName(res.agency_name);
			setPhone(res.phone_number);
			setBio(res.bio);
			setAvater(res.picture);
		})
    };

	useEffect(() => {
		//We will get the agency name from the url
		getuserProfile()
	}, []);

	const saveProfile = () => {
		async function submitProperty(){
			try {
				const formData = new FormData();
				formData.append("agency_name", agencyName);
				formData.append("phone", phone);
				formData.append("bio", bio);
				formData.append("image", image);
				const response = await fetch(`http://127.0.0.1:8000/profiles/${GlobalState.userId}/update/`, {
					method: 'PATCH',
					body: formData,
				})
			} catch (e) {
				console.log(e.response)
			}
		}
		submitProperty()
	}

  return (
    <>
		<MainNavBar />
		<Box sx={{display:'flex', justifyContent:'center', padding:'2rem'}}>
			<Card sx={{ maxWidth: "76%", minHeight: "50%", padding: '2rem' }}>
				<CardMedia
					component="img"
					sx={{
						height: 140,
						width: 140,
						borderRadius: "50%",
						marginLeft: "41%",
						marginRight: "45%",
						backgroundColor: "red"
					}}
					image={avatar ? avatar : anonymous_user}
					title="green iguana"
					mx={2}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
						Profile Settings
					</Typography>
					<Divider sx={{fontWeight:500, my:3}}>
						Overview
					</Divider>
					<TextField
						name="agencyName"
						variant='outlined'
						label="Agency Name"
						fullWidth
						sx={{marginBottom:'1rem'}}
						value={agencyName}
						onChange={handleChange}
						InputProps={{
							startAdornment: (
							<InputAdornment position="start">
								<BadgeIcon />
							</InputAdornment>
							),
						}}
					/>
					<TextField
                        name="phone"
						variant='outlined'
						label="Phone Number"
						fullWidth
						sx={{marginBottom:'1rem'}}
						value={phone}
						onChange={handleChange}
						InputProps={{
							startAdornment: (
							<InputAdornment position="start">
								<PhoneIcon />
							</InputAdornment>
							),
						}}
					/>
					<TextField
                        name="bio"
                        variant='outlined'
						fullWidth
						label="Bio"
						multiline
						rows={4}
						sx={{marginBottom:'1rem'}}
						value={bio}
						onChange={handleChange}
					/>
					<Tooltip title="Upload your profile picture" placement="top">
						<Button 
							fullWidth 
							color="success" 
							variant="contained" 
							sx={{fontWeight:600, my:2}} 
							xs={8} 
							size="large"
							component="label"
						>
							
							<CloudUploadIcon fontSize="medium" sx={{mx:1}}></CloudUploadIcon>
							<input 
                                name="image" 
                                id="contained-button-file" 
								type="file" 
								accept="image/png, image/gif, image/jpeg" 
								hidden
								onChange={handleChange}
							/>
						</Button>
					</Tooltip>
					<Grid item container justifyContent="center" alignItems="center" flexDirection="column">
						{image ? <><h3>Uploaded:</h3><ul><li>{image[0].name}</li></ul></> : <></>}
					</Grid>
					<Button 
						fullWidth 
						variant="contained" 
						sx={{fontWeight:600, my:1}} 
						xs={8}
						onClick={saveProfile}
					>Save</Button>
				</CardContent>
			</Card>
		</Box>
	</>
)
}

export default Profile 