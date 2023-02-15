import React from 'react'
import MainNavBar from './MainNavBar';
import { Box, Card, CardMedia, CardContent, CardActions,  InputAdornment , TextField, Button, Tooltip , Divider, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import anonymous_user from '../assets/anonymous_user.png'
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';

function Profile() {
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
				image={anonymous_user}
				title="green iguana"
				mx={2}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
					Profile Settings
				</Typography>
				{/*<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>*/}
				<Divider sx={{fontWeight:500, my:3}}>
					Overview
				</Divider>
				<TextField
					variant='outlined'
					label="Agency Name"
					fullWidth
					sx={{marginBottom:'1rem'}}
					InputProps={{
						startAdornment: (
						  <InputAdornment position="start">
							<BadgeIcon />
						  </InputAdornment>
						),
					  }}
				/>
				<TextField
					variant='outlined'
					label="Phone Number"
					fullWidth
					sx={{marginBottom:'1rem'}}
					InputProps={{
						startAdornment: (
						  <InputAdornment position="start">
							<PhoneIcon />
						  </InputAdornment>
						),
					  }}
				/>
				<TextField
					fullWidth
					variant="outlined"
					label="Bio"
					multiline
					rows={4}
					defaultValue="Tell us more about yourself if you wish"
					sx={{marginBottom:'1rem'}}
        		/>
				<Divider sx={{fontWeight:500, my:3}}>
					Avatar Picture
				</Divider>
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
								type="file" 
								accept="image/png, image/gif, image/jpeg" 
								hidden
								onChange={(e) => dispatch({
									type: "uploadFileChange",
									uploadedPicture: e.target.files[0],
								})}
							/>
						</Button>
					</Tooltip>
			</CardContent>
	<CardActions>
	<Button size="small">Save</Button>
	<Button size="small">Cancel</Button>
	</CardActions>
	</Card>
	</Box>
	</>

	)
	}

export default Profile 