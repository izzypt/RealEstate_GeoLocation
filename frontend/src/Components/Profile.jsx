//React
import react, { useReducer, useState, useContext, useEffect } from "react";
//MUI
import { Box, Grid, Card, CardMedia, CardHeader, CardContent, CardActions,  InputAdornment , TextField, Button, Tooltip , Divider, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import anonymous_user from '../assets/anonymous_user.png'
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
//Components
import MainNavBar from './MainNavBar';
//Context
import StateContext from "../Contexts/StateContext";
import { textAlign } from "@mui/system";

function Profile() {
	const [agencyName, setAgencyName] = useState('');
	const [phone, setPhone] = useState('');
	const [bio, setBio] = useState('');
	const [image, setImage] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [userListings, setUserListings] = useState([]);
	const [editMode, setEditMode] = useState(true);
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
				setImage(event.target.files[0]);
                break;
		}
	};



	useEffect(() => {
		//We will get the agency name from the url
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
				setAvatar(res.picture);
				setUserListings(res.profile_owner_listings);
	
			})
		};
		getuserProfile()
	}, []);

	const saveProfile = () => {
		async function submitProperty(){
			try {
				const formData = new FormData();
				formData.append("agency_name", agencyName);
				formData.append("phone_number", phone);
				formData.append("bio", bio);
				if (image)
					formData.append("picture", image);
				console.log(agencyName, phone, bio, image);
				console.table([...formData])
				const response = await fetch(`http://127.0.0.1:8000/profiles/${GlobalState.userId}/update/`, {
					method: 'PATCH',
					body: formData,
				}).then(res => res.json()).then(res => {
					console.log(res)
                    setEditMode(true);
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
			<Card variant="outlined" sx={{ minWidth: "76%", minHeight: "50%", padding: '2rem' }}>
				<CardHeader 
					title={<Typography variant="h5" textAlign={"center"}>{GlobalState.userName}'s Profile</Typography>}
					action={
						<Tooltip title="Click here to enable profile edit" placement="top">
							<ModeEditIcon
								sx={{
                                    '&:hover': {
                                        cursor: 'pointer'
                                    },
                                }}
								onClick={() => setEditMode(!editMode)}
							/>
						</Tooltip>
						
					}
				/>
				<CardMedia
					component="img"
					sx={{
						height: 140,
						width: 140,
						borderRadius: "50%",
						margin: '0 auto',
						backgroundColor: "red"
					}}
					image={avatar ? avatar : anonymous_user}
					title="green iguana"
					mx={2}
				/>
				<CardContent>
					<Divider sx={{fontWeight:900, my:3, px:2}}>
						General
					</Divider>
					<TextField
						name="agencyName"
						variant='outlined'
						label="Agency Name"
						fullWidth
						disabled={editMode}
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
						disabled={editMode}
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
						disabled={editMode}
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
							disabled={editMode} 
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
						{image ? <><h3>Uploaded:</h3><ul><li>{image.name}</li></ul></> : <></>}
					</Grid>
					<Divider sx={{fontWeight:900, my:3}}>
						My Listings 
					</Divider>
					<Grid>
						{
						userListings.length > 0 ?
							userListings.map((listing, index) => {
								return (
									<Grid item xs={12} sm={6} md={4} key={index}>
										<Card variant="outlined" sx={{ padding: '2rem', my: 2 }}>
											{
											<CardHeader 
												action={<DeleteIcon color="error" sx={{":hover":{cursor:"pointer"}}}/>}
												title={listing.title} 
												subheader={listing.description}
											/>
											}
										</Card>	
									</Grid>
								) 
							}) :
							<h4>You don't have any listings yet.</h4>
						}

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