//REACT
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
//Components
import MainNavBar from './MainNavBar'
import anonymous_user from '../assets/anonymous_user.png'
//MUI
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Box, Card, CardHeader, Divider, Breadcrumbs, Link } from '@mui/material';
// Contexts
import StateContext from '../Contexts/StateContext';

function Agencies() {
	// State and Context
	const [agencies, setAgencies] = useState([])
	const GlobalState = useContext(StateContext)
	const navigate = useNavigate()

	const getAgencies = async () => {
		const response = await fetch(`http://127.0.0.1:8000/profiles/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(res => {
			setAgencies(res)
		})
    };

	useEffect(() => {
		getAgencies()
	}, [])

	useEffect(() => {
		if(!GlobalState.userLoggedIn)
			navigate('/notAllowed')
	}, [GlobalState.userLoggedIn])

	return (
	<>
		<MainNavBar/>
		<Grid item style={{margin:'1rem'}}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link 
						underline="hover" 						
						style={{cursor:'pointer'}} 
						color="inherit" 
						onClick={() => navigate("/")}
					>
						Home
					</Link>
					<Link
						underline="hover"
						color="inherit"
					>
						Agencies
					</Link>
				</Breadcrumbs>
		</Grid>
		<Box>
			<Card 
				variant="outlined" 
				sx={{maxWidth: "76%", minHeight: "50%", padding: '2rem', margin: '0 auto', marginTop:'2rem', 
				border:'1px solid black', }}
			>
				<CardHeader 
					title="Agencies" 
					subheader="Find out the agency you are looking for" 
					style={{textAlign:'center'}}
				/>
				<Divider 
					sx={{fontWeight:900, my:3}}
				>
					List
				</Divider>
				<Grid container spacing={3}>
					{agencies.map((agency, index) => {
						return (
							<React.Fragment key={index}>
								<Grid item xs={12} sm={6} md={4} lg={3}>
									<Card variant='outlined' sx={{ maxWidth: 345, maxHeight: 315, minHeight: 315, overflow:'auto', margin: '1rem', flexWrap:'wrap'}}>
										<CardMedia
											component="img"
											alt="Agency Picture"
											height="140"
											image={agency.picture ? agency.picture : anonymous_user}
										/>
										<CardContent>
											<Typography 
												gutterBottom 
												variant="h5" 
												component="div"
											>
												{agency.agency_name ? agency.agency_name : "(Anonymous)"}
											</Typography>
											<Typography 
												variant="body2" 
												color="text.secondary"
											>
												{agency.bio ? agency.bio : "This user has not defined a bio"}
											</Typography>
										</CardContent>
										<CardActions>
											<Button 
												size="small"
												onClick={() => {
													navigate(`/Agencies/${agency.profile_owner}`)
												}}
											>
												{agency.profile_owner_listings.length == 1 ? "1 property listed" : `${agency.profile_owner_listings.length} properties listed` } 
												
											</Button>
										</CardActions>
									</Card>
								</Grid>
							</React.Fragment>
						)
					})}
				</Grid>
			</Card>
		</Box>
	</>
	)
}

export default Agencies