//REACT
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
//Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from "leaflet"
//MUI
import { Grid, AppBar, Divider, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExploreIcon from '@mui/icons-material/Explore';
//Components
import MainNavBar from './MainNavBar'
//Icons
import house_icon from '../assets/bighouse.png'
import apartment_icon from '../assets/apartment_icon.png'
import office_icon from '../assets/office_icon.png'
//Packages
import moment from 'moment'
import { useImmerReducer } from 'use-immer'
// Contexts
import StateContext from '../Contexts/StateContext';
import DispatchContext from '../Contexts/DispatchContext';

function Listings() {
	/* ---> STATE HANDLING <--- */
	const initialState = {
		mapInstance: null,
	}
	const GlobalState = useContext(StateContext)
	const navigate = useNavigate()
	const [latitude, setLatitude] = useState(38.70715)
	const [longitude, setLongitude] = useState(-9.13549)
	const [allListings, setAllListings] = useState([])
	const [state, dispatch] = useImmerReducer(reducer, initialState)

	function reducer(state, action){
		switch (action.type){
			case 'getMap':
				state.mapInstance = action.mapData;
				break;
		}
		
	}

	/* MAP COMPONENT to retrieve data and methods from map object */
	const MapComponent = () => {
		const map = useMap();
		dispatch({type: 'getMap', mapData: map});
		return null;
	}

	useEffect(() => {
		const getAllListings = async () => {
			const listings = await fetch('http://127.0.0.1:8000/listings/').then(response => response.json()).then(data => setAllListings(data))
			console.log("alLlistings: ", allListings)
		}
		getAllListings()
	}, [])

	useEffect(() => {
		if(!GlobalState.userLoggedIn)
			navigate('/notAllowed')
	}, [GlobalState.userLoggedIn])


	{/* <-- LOGIC --> */}
	function iconDisplay(listing){
		if (listing.listing_type == 'House')
			return houseIcon
		if (listing.listing_type == 'Apartment')
			return appartmentIcon
		if (listing.listing_type == 'Ofice')
			return officeIcon
		return houseIcon
	}
	{/* <-- ICONS --> */}	
	const houseIcon = new Icon({
		iconUrl: house_icon,
		iconSize: [40,40],
	});
	const appartmentIcon = new Icon({
		iconUrl: apartment_icon,
		iconSize: [40,40],
	});
	const officeIcon = new Icon({
		iconUrl: office_icon,
		iconSize: [40,40],
	})

	{/* <-- JSX --> */}	
	return (
	<>
		{/* <-- NAVBAR --> */}
		<MainNavBar/>
		<Grid container>
			{/* <-- LISTINGS --> */}
			<Grid item xs={5}>
				{allListings.map(listing => {
					return (
						<Card key={listing.id} style={{margin:'1rem', border:'1px solid black', padding: '1rem'}}>
							<CardHeader
								action={
								<IconButton aria-label="settings" onClick={() => state.mapInstance.flyTo([listing.latitude, listing.longitude], 16)}>
									<ExploreIcon color="success" />
								</IconButton>
								}
								title={listing.title}
								subheader={moment(listing.date_posted).format('DD/MM/YY') + "- " + listing.seller_username}
							/>
							<CardMedia
								component="img"
								height="194vh"
								image={listing.picture}
								alt="Property picture"
								style={{paddingRight:'1rem', paddingLeft:'1rem', height:'20rem', width:'95%', justifyContent:'center', alignItems:'center'}}

							/>
							<CardContent sx={{backgroundColor:'rgba(176, 190, 197, 0.2)', marginTop:'1rem'}}>
								<Typography variant="body2" color="text.secondary">
									{listing.description}
								</Typography>
							</CardContent>
						</Card>
					)
				})}
			</Grid>
			<Grid item xs={7}>
				{/* <-- MAP --> */}
				<AppBar position='sticky'>
					<MapContainer style={{height:"100vh"}} center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
						<MapComponent/>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{allListings.map(listing => {
							return (
								<Marker 
									key={listing.id} 
									icon={iconDisplay(listing)} 
									position={[listing.latitude ? listing.latitude : 0, listing?.longitude ? listing.longitude : 0]}
								>
									<Popup>
										<img 
											src={listing.picture} 
											style={{height:'8rem', width: '10rem'}}
										/><br/>
										<p style={{margin:"4px"}}> Description: {listing.description.substring(0, 100) + '(...)'}</p>
										<p style={{margin:"4px"}}> Price : {listing.price}€</p>
										<Button 
											variant="contained" 
											fullWidth 
											style={{margin:"auto"}}
										>
											More
										</Button>
									</Popup>
								</Marker>
							)
						})}
					</MapContainer>
				</AppBar>
			</Grid>
		</Grid>
	</>
  )
}

export default Listings