//React
import react, { useEffect, useRef, useMemo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
//Components
import MainNavBar from "./MainNavBar";
// Mui
import { Card, Grid, CardHeader, CardContent,  InputAdornment , TextField, Button, Tooltip , Divider , Checkbox, FormControlLabel, FormGroup, Breadcrumbs, Link, Snackbar } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EuroIcon from '@mui/icons-material/Euro';
// Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
//Context
import DispatchContext from "../Contexts/DispatchContext";
import StateContext from "../Contexts/StateContext";
// Data Objects
import options from "./dummydata"
const {propertyStatusOptions, areaOptions, LisboaCentroOptions, LisboaOesteOptions, LisboaEsteOptions, listingTypeOptions, rentalFrequencyOptions} = options;


const AddProperty = () => {
	/* ---> STATE <--- */
	const initialState = {
		titleValue: "",
		listingTypeValue: "",
		descriptionValue: "",
		areaValue: "",
		propertyStatusValue: "",
		boroughValue: "",
		latitudeValue: "",
		longitudeValue: "",
		priceValue: "",
		rentalFrequencyValue : "",
		roomsValue: "",
		furnishedValue: Boolean(false),
		poolValue: Boolean(false),
		elevatorValue: Boolean(false),
		cctvValue: Boolean(false),
		parkingValue: Boolean(false),
		pictureValue: "",
		mapInstance: null,
		markerPosition: [38.70715, -9.13549],
		uploadedPicture: null,
		sendRequest: 0,
	}
	
	/* ---> STATE HANDLING <--- */
	const [state, dispatch] = useImmerReducer(reducer, initialState)
	const [dialogOpen, setDialogOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const GlobalState = useContext(StateContext);

	function reducer(state, action){
		switch (action.type){
			case "catchTitleChange":
				state.titleValue = action.titleValue;
				break;
			case "ListingTypeChange":
				state.listingTypeValue = action.listingTypeValue;
				break;
			case 'DescriptionChange':
				state.descriptionValue = action.descriptionValue;
				break;
			case 'areaValueChange':
				state.areaValue = action.areaValue;
				break;
			case 'boroughValueChange':
				state.boroughValue = action.boroughValue;
				break;
			case 'latitudeValueChange':
				state.latitudeValue = action.latitudeValue;
				break;
			case 'longitudeValueChange':
				state.longitudeValue = action.longitudeValue;
				break;
			case 'propertyStatusValueChange':
				state.propertyStatusValue = action.propertyStatusValue;
				break;
			case 'priceValueChange':
				state.priceValue = action.priceValue;
				break;
			case 'furnishedValueChange':
				state.furnishedValue = !state.furnishedValue;
				break;
			case 'poolValueChange':
				state.poolValue = !state.poolValue;
				break;
			case 'cctvValueChange':
				state.cctvValue = !state.cctvValue;
				break;
			case 'elevatorValueChange':
				state.elevatorValue = !state.elevatorValue;
					break;
			case 'parkingValueChange':
				state.parkingValue = !state.parkingValue;
				break;
			case 'rentalFrequencyValueChange':
				state.rentalFrequencyValue = action.rentalFrequencyValue;
				break;
			case 'roomsValueChange':
				state.roomsValue = action.roomsValue;
				break;
			case 'pictureValueChange':
				state.pictureValue = action.pictureValue;
				break;
			case 'getMap':
				state.mapInstance = action.mapData;
				break;
			case'markerPositionChange':
				state.markerPosition = action.newPosition;		
				break;
			case 'uploadFileChange':
				state.uploadedPicture = action.uploadedPicture;
				break;
			case 'submitForm':
				state.sendRequest = state.sendRequest + 1;
				break;
		}

	}
	
	  /* MAP COMPONENT to retrieve data and methods from map object */
	const MapComponent = ({ dispatch }) => {
		const map = useMap();
		useEffect(() => {
			dispatch({ type: 'getMap', mapData: map });
		  }, [dispatch, map]);
		  return null;
		return null;
	}

	/* MARKER logic */
	const markerRef = useRef(null)
	const markerEventHandlers = useMemo(() => (
		{
		dragend() {
			const marker = markerRef.current
			if (marker != null) {
				let newPosition = marker.getLatLng()
				dispatch({type: 'markerPositionChange', newPosition: [newPosition.lat, newPosition.lng]})
			}
		}
		}
		), [],
	)

	/* FORM SUMBIT */
	function submitForm(e){
		dispatch({type: 'submitForm'});
	}

    const handleDialogClose = () => {
        setDialogOpen(false);
	};

	useEffect(() => {
		if (state.sendRequest)
		{
			async function submitProperty(){
				const formData = new FormData();
				formData.append("title", state.titleValue);
				formData.append("description", state.descriptionValue);
				formData.append("area", state.areaValue);
				formData.append("borough", state.boroughValue);
				formData.append("listing_type", state.listingTypeValue); 
				formData.append("property_status", state.propertyStatusValue);
				formData.append("price", state.priceValue);
				formData.append("rental_frequency", state.rentalFrequencyValue);
				formData.append("rooms", state.roomsValue);
				formData.append("furnished", state.furnishedValue);
				formData.append("pool", state.poolValue);
				formData.append("cctv", state.cctvValue);
				formData.append("elevator", state.elevatorValue);
				formData.append("parking", state.parkingValue);
				formData.append("picture", state.uploadedPicture);
				formData.append("latitude", state.markerPosition[0]);
				formData.append("longitude", state.markerPosition[1]);
				formData.append("seller", GlobalState.userId);
				console.table([...formData])
				try {
					const response = await fetch('http://127.0.0.1:8000/listings/create/', {
						method: 'POST',
                        body: formData,
                    })
					if (response.ok) {
						// handle successful response
						setSnackbarMessage("Property added successfully");
						setDialogOpen(true)
					} else {
						// handle error response
						setSnackbarMessage("Something went wrong, please try again with all fields.");
						setDialogOpen(true)
						console.log('Error');
					}
				} catch (e) {
					console.log(e.response)
				}

			}
			submitProperty()
		}
	}, [state.sendRequest]);

	/* Change the map view depending on the selected borough */
	useEffect(() => {
		if (state.boroughValue === "Avenidas Novas")
			{
				state.mapInstance.flyTo([38.738932262403736, -9.149094706615147], 15)
				dispatch({type: 'markerPositionChange', newPosition: [38.738932262403736, -9.149094706615147]})
			}
		if (state.boroughValue === "Santo António")
			{
				state.mapInstance.flyTo([38.72343077298686, -9.148200065212555], 15);
				dispatch({type: 'markerPositionChange', newPosition: [38.72343077298686, -9.148200065212555]})
			}
		if (state.boroughValue === "Arroios")
			{
				state.mapInstance.flyTo([38.7332200797637, -9.134526570908413], 15);
				dispatch({type: 'markerPositionChange', newPosition: [38.7332200797637, -9.134526570908413]})
			}		
		if (state.boroughValue === "Penha de França")
			{
				state.mapInstance.flyTo([38.72601589873542, -9.12832387438198], 15);
				dispatch({type: 'markerPositionChange', newPosition: [38.72601589873542, -9.12832387438198]})
			}		
		if (state.boroughValue === "Parque das Nações")
			{
				state.mapInstance.flyTo([38.76854806625644, -9.094284517698433], 15);
				dispatch({type: 'markerPositionChange', newPosition: [38.76854806625644, -9.094284517698433]})
			}
		if (state.boroughValue === "Marvila")
			{
				state.mapInstance.flyTo([38.74067950035069, -9.10702620203663], 15);
				dispatch({type: 'markerPositionChange', newPosition: [38.74067950035069, -9.10702620203663]})
			}
		if (state.boroughValue === "Olivais")
			{
				state.mapInstance.flyTo([38.76244640046225, -9.114765684802151], 15)
				dispatch({type: 'markerPositionChange', newPosition: [38.76244640046225, -9.114765684802151]})
			}
		if (state.boroughValue === "Alcântara")
			{
				state.mapInstance.flyTo([38.70605002306069, -9.182798146505943], 15)
				dispatch({type: 'markerPositionChange', newPosition: [38.70605002306069, -9.182798146505943]})
			}
		if (state.boroughValue === "Ajuda")
			{
				state.mapInstance.flyTo([38.7113236798269, -9.198231351620256], 15);
				dispatch({type: 'markerPositionChange', newPosition: [38.7113236798269, -9.198231351620256]})
			}		
		if (state.boroughValue === "Belém")
			{
				state.mapInstance.flyTo([38.69936129443914, -9.220382930975399], 15)
				dispatch({type: 'markerPositionChange', newPosition: [38.69936129443914, -9.220382930975399]})
			}

	}, [state.boroughValue])
  return (
    <>
		{/*----- NAVBAR -----*/}
		<MainNavBar />
		{/*----- BREADCRUMBS -----*/}
		<Grid item style={{marginTop:'1rem',marginLeft:'1rem', display:'inline-block'}}>
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
					>
						Add Property
					</Link>
				</Breadcrumbs>
			</div>
		</Grid>  
		{/*-----> CARD <-----*/}
		<div style={{display:"flex", justifyContent:"center", marginTop:'3rem'}}>
				<Card 
					variant="outlined"
					sx={{maxWidth:"75%", minWidth: "75%", padding:'3rem'}}
				>
					<CardHeader title="Submit a property" subheader="Add a new property with all of the (*) required fields."/>
					<CardContent>
						{/* <---- TEXT FIELDS ----> */}
						<Divider sx={{fontWeight:500, my:3}}>
							Overview
						</Divider>
						{/* <---- TITLE ----> */}
						<TextField 
							id="Title"
							variant="outlined" 
							fullWidth 
							label="Title*"
							onChange={(e) => dispatch({
								type: "catchTitleChange",
								titleValue: e.target.value
							})}
							sx={{ marginBottom: 3 }} 
						/><br/>
						{/* <---- LISTING TYPE ----> */}
						<TextField 
							select
							id="ListingType"
							variant="filled"
							fullWidth 
							label="Listing Type*"
							onChange={(e) => dispatch({
								type: "ListingTypeChange",
								listingTypeValue: e.target.value
							})}
							sx={{ marginBottom: 3 }} 
							SelectProps={{
								native: true,
							}}
						>
							{listingTypeOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
						{/* <---- DESCRIPTION ----> */}
						<TextField 
							id="description"
							multiline
							rows={5}
							variant="outlined" 
							fullWidth 
							label="Description*"
							onChange={(e) => dispatch({
								type: "DescriptionChange",
								descriptionValue: e.target.value
							})}
							sx={{ marginBottom: 3 }} 
						/><br/>
						{/* <---- PROPERTY STATUS ----> */}
						<TextField 
                            select
							id="propertystatus"
							variant="filled" 
							fullWidth 
							label="Propert Status*"
							onChange={(e) => dispatch({
								type: "propertyStatusValueChange",
								propertyStatusValue: e.target.value
							})}
							sx={{ marginBottom: 3 }} 
							SelectProps={{
								native: true,
							}}
						>
							{propertyStatusOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
						{/* <---- RENTAL FREQUENCY ----> */}
							<TextField 
								select
								id="rentalfrequency"
								variant="filled" 
								fullWidth 
								disabled={state.propertyStatusValue === "Sale" ? true : false} 
								label="Rental Frenquency"
								onChange={(e) => dispatch({
									type: "rentalFrequencyValueChange",
									rentalFrequencyValue: e.target.value
								})}
								sx={{ marginBottom: 3 }} 
								SelectProps={{
									native: true,
								}}
							>
								{rentalFrequencyOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField> 
						{/* <---- PRICE ----> */}
						<TextField 
							id="price"
							type="number"
							variant="outlined" 
							fullWidth 
							label="Price*"
							onChange={(e) => dispatch({
								type: "priceValueChange",
								priceValue: e.target.value
							})}
							InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<EuroIcon />
								  </InputAdornment>
								),
							  }}
							sx={{ marginBottom: 3 }} 
						/><br/>
						{/* <---- ROOMS ----> */}
						<TextField 
							id="rooms"
							variant="outlined"
							type="number" 
							fullWidth 
							label="Rooms*"
							onChange={(e) => dispatch({
								type: "roomsValueChange",
								roomsValue: e.target.value
							})}
							sx={{ marginBottom: 3 }} 
						/><br/>
						
						{/* <---- CHECKBOXES ----> */}
						<Divider sx={{fontWeight:500, my:3}}>
							Options
						</Divider>
						<FormGroup style={{display:"flex",flexDirection:'row', justifyContent:"space-between"}} sx={{my:4}}>
							<FormControlLabel 
								control={
									<Checkbox
										color="success" 
										checked={state.furnishedValue} 
										onChange={(e) => dispatch({
											type: "furnishedValueChange",
										})} 
									/>
								} 
								label="Furnished" 
							/>
							<FormControlLabel 
								control={
									<Checkbox 
										color="success"
										checked={state.poolValue} 
										onChange={(e) => dispatch({
											type: "poolValueChange",
										})} 
									/>
								} 
								label="Pool" 
							/>
							<FormControlLabel 
								control={
								<Checkbox
									color="success" 
									checked={state.cctvValue} 
									onChange={(e) => dispatch({
										type: "cctvValueChange",
									})} 
								/>
							} 
								label="CCTV" 
							/>
							<FormControlLabel
							 	label="Elevator"
								control={
									<Checkbox 
										color="success" 
										checked={state.elevatorValue} 
										onChange={(e) => dispatch({
											type: "elevatorValueChange",
										})}
									/>
								}  
							/>
							<FormControlLabel 
								label="Parking" 
								control={
									<Checkbox 
										color="success" 
										checked={state.parkingValue} 
										onChange={(e) => dispatch({
											type: "parkingValueChange",
										})} 
									/>
								} 
							/>
						</FormGroup>

						{/* <---- SELECTS ----> */}
						
						<Divider sx={{fontWeight:500, my:3}}>
							Location*
						</Divider>
						<CardHeader sx={{textAlign:'center'}} subheader="Select an area or drag the marker to your prefered location"/>
						<Grid item container justifyContent="space-between">
							<Grid item xs={5}>
								<TextField 
									id="area"
									variant="filled"
									fullWidth 
									label="Area*"
									value={state.areaValue}
									onChange={(e) => dispatch({
										type: "areaValueChange",
										areaValue: e.target.value
									})}
									sx={{ marginBottom: 2, marginTop: 2 }} 
									select
									SelectProps={{
										native: true,
									}}
								>
									{areaOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
								</TextField>
							</Grid>
							<Grid item xs={5}>
								<TextField 
									id="borough"
									variant="filled" 
									fullWidth 
									label="Borough*"
									onChange={(e) => dispatch({
										type: "boroughValueChange",
										boroughValue: e.target.value
									})}
									sx={{ marginBottom: 2, marginTop: 2 }}
									select
									SelectProps={{
										native: true,
									}}
								> 
									{
									state.areaValue === 'Lisboa Centro' ? 									
										LisboaCentroOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										)) : state.areaValue === 'Lisboa Oeste' ? 
										LisboaOesteOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										)) : state.areaValue === "Lisboa Este" ? 
										LisboaEsteOptions.map((option) => (
											<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))  : <></>
									}
								</TextField>
							</Grid>
						</Grid>

						{/* <---- MAP ----> */}
						
						<MapContainer center={state.markerPosition} zoom={13} scrollWheelZoom={true} style={{height:"55vh", margin: '1rem', border: "2px solid black"}}>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<MapComponent dispatch={dispatch} />
							<Marker
								draggable={true}
								position={state.markerPosition}
								eventHandlers={markerEventHandlers}
								ref={markerRef}
							>
								<Popup>
									Drag this marker to the property location
								</Popup>
							</Marker>
						</MapContainer>

						{/* <---- UPLOAD PICTURES----> */}
						<Grid item container justifyContent="space-around">
							<Tooltip title="Upload image" placement="top">
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
						</Grid>
						<Grid item container justifyContent="center" alignItems="center" flexDirection="column">
							{state.uploadedPicture ? <><h3>Uploaded:</h3><ul><li>{state.uploadedPicture.name}</li></ul></> : <></>}
						</Grid>
						{/* <---- SUBMIT BUTTON ----> */}
						<Grid item container justifyContent="space-around">
							<Button fullWidth variant="contained" sx={{fontWeight:600, my:1}} xs={8} onClick={submitForm}>Submit</Button>
						</Grid>
					</CardContent>
				</Card>
				<Snackbar
					open={dialogOpen}
					autoHideDuration={5000}
					onClose={handleDialogClose}
					message={snackbarMessage}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				></Snackbar>
		</div>
    </>
  );
};

export default AddProperty;
