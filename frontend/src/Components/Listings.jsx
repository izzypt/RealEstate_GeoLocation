import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet"
import { Grid, AppBar, Button, Card, CardMedia, CardHeader, CardContent, CardActions, Typography, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import MainNavBar from './MainNavBar'
import house_icon from '../assets/bighouse.png'
import apartment_icon from '../assets/apartment_icon.png'
import office_icon from '../assets/office_icon.png'
import img from '../assets/house_image.jpg'
import myListings from './dummydata'

function Listings() {
	{/* <-- STATE --> */}	
	const [latitude, setLatitude] = useState(51.505)
	const [longitude, setLongitude] = useState(-0.09)
	const [allListings, setAllListings] = useState([])

	useEffect(() => {
		const getAllListings = async () => {
			const listings = await fetch('http://127.0.0.1:8000/listings/').then(response => response.json()).then(data => setAllListings(data))
			console.log("alLlistings: ", allListings)
		}
		getAllListings()
	}, [])
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
			<Grid item xs={4}>
				{allListings.map(listing => {
					return (
						<Card key={listing.id} style={{margin:'1rem', border:'1px solid black'}}>
							<CardHeader
								/*action={
								<IconButton aria-label="settings">
									<MoreVertIcon />
								</IconButton>
								}*/
								title={listing.title}
								subheader="September 14, 2016"
							/>
							<CardMedia
								component="img"
								height="194"
								image={listing.picture}
								alt="Paella dish"
								style={{paddingRight:'1rem', paddingLeft:'1rem', height:'20rem', width:'35rem'}}
							/>
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									{listing.description}
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<IconButton aria-label="add to favorites">
								<FavoriteIcon />
								</IconButton>
								<IconButton aria-label="share">
								<ShareIcon />
								</IconButton>
							</CardActions>
						</Card>
					)
				})}
			</Grid>
			<Grid item xs={8}>
				{/* <-- MAP --> */}
				<AppBar position='sticky'>
					<MapContainer style={{height:"93vh"}} center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{allListings.map(listing => {
							return (
								<Marker key={listing.id} icon={iconDisplay(listing)} position={[listing.latitude ? listing.latitude : 0, listing?.longitude ? listing.longitude : 0]}>
									<Popup>
										<img src={listing.picture} style={{height:'8rem', width: '10rem'}}/><br/>
										<p style={{margin:"4px"}}>Description: {listing.description.substring(0, 150) + '...'}</p>
										<p style={{margin:"4px"}}>Price : {listing.price}$</p>
										<Button variant="contained" fullWidth style={{margin:"auto"}}>More</Button>
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