//REACT
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
//Components
import MainNavBar from './MainNavBar'
// Contexts
import StateContext from '../Contexts/StateContext';
//MUI
import { Box, Grid, Card, CardMedia, CardHeader, CardContent, CardActions,  InputAdornment , IconButton, Button, Tooltip , Divider, Typography, Avatar, Breadcrumbs, Link } from "@mui/material";
import anonymous_user from '../assets/anonymous_user.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { maxWidth } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
//Packages
import moment from 'moment'

function ListingDetail() {
	const GlobalState = useContext(StateContext)
	const urlParams = useParams()
	const navigate = useNavigate()
	const [listingDetail, setListingDetail] = useState({})
	const excludedColumns = ['id', 'seller_username','title', 'description', 'latitude', 'longitude', 'address', 'city', 'seller', 'picture', 'picture2']

	useEffect(() => {
	//We will get the agency name from the url
	const getListingDetails = async () => {
		const response = await fetch(`http://127.0.0.1:8000/listings/${urlParams.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${GlobalState.token}`
		}
		}).then(res => res.json()).then(res => {
			setListingDetail(res)
		})
	};
	getListingDetails()
	}, []);    

	function handleKeys(key) {
		switch (key) {
			case 'seller_agency_name':
			  return 'Agency Name'
			case 'listing_type':
				return 'Listing Type'
			case 'property_status':
				return 'Property Status'
            case 'rental_frequency':
				return 'Rental Frequency'
			case 'date_posted':
				//listingDetail[key] = moment(listingDetail[key]).format('DD/MM/YY')
				return 'Date Posted'
            default:
				return key.charAt(0).toUpperCase() + key.slice(1);
		  }
	}
	return (
	<>
		<MainNavBar/>
		<Grid item style={{margin:'1rem'}}>
			<div role="presentation">
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
						onClick={() => navigate("/listings/")}
						style={{cursor:'pointer'}}
					>
						Listing
					</Link>
					<Typography color="text.primary">Details</Typography>
				</Breadcrumbs>
			</div>
		</Grid>
		<Box sx={{display:'flex', justifyContent:'center', padding:'0.5rem'}}>
			<Grid item sx={{display:'flex', flexDirection:'column', alignItems:'center', padding:'0.5rem', maxWidth:'75%', border:'1px solid black'}}>
				<h2>{listingDetail.title}</h2>
				<img src={listingDetail.picture} alt={listingDetail.name} style={{maxWidth: "56%"}}/>
				<Typography sx={{backgroundColor:'rgba(176, 190, 197, 0.2)', margin:'1rem', padding:'2rem', minWidth: "56%", textAlign:'center'}} variant="body2" color="text.secondary">
					{listingDetail.description}
				</Typography>
				<TableContainer component={Paper}>
				<Table sx={{ minWidth: 450 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight:600, fontSize:'medium' }}>Details</TableCell>
							<TableCell sx={{ fontWeight:600, fontSize:'medium' }} align="center">Specifications</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(listingDetail).map((key) => (
						excludedColumns.includes(key)? null : 
						<TableRow key={key}>
							<TableCell component="th" scope="row">
								{handleKeys(key)}
							</TableCell>
							<TableCell align="center">
								{typeof(listingDetail[key]) === 'boolean' ? 
									(listingDetail[key] ? (<CheckIcon fontSize='medium' color="success"></CheckIcon>) : (<DangerousIcon fontSize='medium' color="error"></DangerousIcon>) ) 
									: key === 'date_posted' ? moment(listingDetail[key]).format('DD/MM/YY')
									: listingDetail[key] }
							</TableCell>
						</TableRow>
						))}
					</TableBody>
				</Table>
				</TableContainer>
			</Grid>
		</Box>
		
	</>
	)
}

export default ListingDetail