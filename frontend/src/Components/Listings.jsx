import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Grid } from '@mui/material'
import MainNavBar from './MainNavBar'

function Listings() {
  return (
    <>
		{/* <-- NAVBAR --> */}
		<MainNavBar/>
		<Grid container>
			<Grid item xs={4}>
				BLANK SPACE
			</Grid>
			<Grid item xs={8}>
				{/* <-- MAP --> */}
				<MapContainer style={{height:"93vh"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
					</Marker>
				</MapContainer>
			</Grid>
		</Grid>
    </>
    
    
  )
}

export default Listings