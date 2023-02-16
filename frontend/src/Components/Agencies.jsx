//REACT
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
//Components
import MainNavBar from './MainNavBar'
//MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardHeader } from '@mui/material';
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
			console.log("Got user info", res)
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
		<Box>
			<Card variant="outlined" sx={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly', maxWidth: "76%", minHeight: "50%", padding: '2rem', margin: '0 auto', marginTop:'2rem' }}>
				{agencies.map((agency, index) => {
					return (
						<>
							<Card key={index} variant='outlined' sx={{ maxWidth: 345, margin: '1rem', flex: '0 0 calc(33.33% - 2rem)' }}>
								<CardMedia
									component="img"
									alt="Agency Picture"
									height="140"
									image={agency.picture}
								/>
								<CardContent>
									<Typography 
										gutterBottom 
										variant="h5" 
										component="div"
									>
										{agency.agency_name ? agency.agency_name : "(No Name provided)"}
									</Typography>
									<Typography 
										variant="body2" 
										color="text.secondary"
									>
										{agency.bio ? agency.bio : "(No bio provided)"}
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
						</>
					)
				})}
			</Card>
		</Box>
	</>
	)
}

export default Agencies