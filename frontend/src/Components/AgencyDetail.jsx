//REACT
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
//Components
import MainNavBar from './MainNavBar'
// Contexts
import StateContext from '../Contexts/StateContext';
//MUI
import { Box, Grid, Card, CardMedia, CardHeader, CardContent, CardActions,  InputAdornment , IconButton, Button, Tooltip , Divider, Typography, Avatar } from "@mui/material";
import anonymous_user from '../assets/anonymous_user.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { padding } from '@mui/system';


function AgencyDetail() {
    const GlobalState = useContext(StateContext)
    const urlParams = useParams()
    const navigate = useNavigate()
    const [agencyDetail, setAgencyDetail] = useState({})

	useEffect(() => {
		//We will get the agency name from the url
		const getAgencyProfile = async () => {
			const response = await fetch(`http://127.0.0.1:8000/profiles/${urlParams.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${GlobalState.token}`
				}
			}).then(res => res.json()).then(res => {
				console.log("Got user info", res)
                setAgencyDetail(res)
			})
		};
		getAgencyProfile()
	}, []);    

    return (
        <>
            <MainNavBar />  
			<Box sx={{display:'flex', justifyContent:'center', padding:'2rem'}}>
				<Card variant="outlined" sx={{ maxWidth: "76%", minHeight: "50%", padding: '2rem' }}>
					<CardHeader 
						title={<Typography variant="h5" textAlign={"center"}>{agencyDetail.agency_name}</Typography>}
					/>
					<CardMedia
						component="img"
						sx={{
							height: 140,
							width: 140,
							borderRadius: "50%",
							margin: "0 auto",
							
						}}
						image={agencyDetail.picture ? agencyDetail.picture  : anonymous_user}
						title="Agency Picture"
						onClick={() => console.log(agencyDetail)}
					/>
					<CardContent>
						<div style={{padding:'2rem', backgroundColor:'rgba(176, 190, 197, 0.2)'}}>{agencyDetail.bio}</div>
						<Divider sx={{fontWeight:900, my:3}}>
							{agencyDetail.agency_name} Listings 
						</Divider>
						<Grid>
							{
							agencyDetail.profile_owner_listings?.length > 0 ?
								agencyDetail.profile_owner_listings.map((listing, index) => {
									return (
										<Grid item xs={12} sm={6} md={4} key={index}>
											<Card variant="outlined" sx={{position: 'relative', padding: '1rem', my: 2 }}>
												<IconButton 
													sx={{ position: 'absolute', top: 0, right: 0, margin: '0.5rem' }}
												>
													<VisibilityIcon />
												</IconButton>
												{
													<CardHeader
														avatar={
															<Avatar variant="square" src={listing.picture} />
														}
														title={listing.title}
														subheader={listing.description}
													/>
												}
												<CardActions sx={{justifyContent: 'flex-end'}}>
													<span>{listing.price}€/{listing.property_status}</span>
												</CardActions>
											</Card>	
										</Grid>
									) 
								}) :
								<h4>{agencyDetail.agency_name} doesn't have any listings.</h4>
							}

						</Grid>
					</CardContent>
				</Card>
			</Box>
	</>
    )
}

export default AgencyDetail