//React
import react, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
//Components
import MainNavBar from "./MainNavBar";
// Mui
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Card, Grid, CardHeader, CardContent,  InputAdornment , TextField, Tooltip , Divider , Checkbox, FormControlLabel, FormGroup, Breadcrumbs, Link, Snackbar } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EuroIcon from '@mui/icons-material/Euro';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
// Data Objects
import options from "./dummydata"
const {propertyStatusOptions, areaOptions, LisboaCentroOptions, LisboaOesteOptions, LisboaEsteOptions, listingTypeOptions, rentalFrequencyOptions} = options;

function UpdateListingDialog(props) {
    const [state, setState] = useState({
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
	})
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [dialogOpen, setDialogOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
    const descriptionElementRef = useRef(null);

    useEffect(() => {
        setState((prevState) => {
            return {
              ...prevState,
              titleValue: props.property.title,
              listingTypeValue: props.property.listing_type,
              areaValue: props.property.area,
              propertyStatusValue: props.property.property_status,
              priceValue : props.property.price,
              descriptionValue: props.property.description,
              boroughValue: props.property.borough,
              rentalFrequencyValue: props.property.rental_frequency,
              roomsValue: props.property.rooms,
              furnishedValue: props.property.furnished,
              poolValue: props.property.pool,
              elevatorValue: props.property.elevator,
              cctvValue: props.property.cctv,
              parkingValue: props.property.parking,
              latitudeValue: props.property.latitude,
            };
          });
    },[])
    
    const handleClose = (ev) => {
        props.onClose();
        if (ev === 'updated'){
            setSnackbarMessage("Listing Updated Successfully");
            setDialogOpen(true)
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
	};

    const updateListing = async () =>{ 
		if(window.confirm("Please confirm that you want to update this listing")){
			try {
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
                if (state.uploadedPicture instanceof File && state.uploadedPicture.type.includes("image"))
                    formData.append("picture", state.uploadedPicture);
				console.table([...formData])
				const response = await fetch(`http://127.0.0.1:8000/listings/${props.property.id}/update/`, {
					method: 'PATCH',
                    body: formData,
				})
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    handleClose("updated")
                })
			}	
            catch(err){
                console.log(err);
            }
    	}
	}
  
	/* MAP COMPONENT to retrieve data and methods from map object 
	const MapComponent = () => {
		const map = useMap();
		dispatch({type: 'getMap', mapData: map});
		return null;
	}

	/* MARKER logic
	const markerRef = useRef(null)
	const markerEventHandlers = useMemo(() => (
		{
		dragend() {
			const marker = markerRef.current
			if (marker != null) {
				console.log(marker.getLatLng())
				let newPosition = marker.getLatLng()
				dispatch({type: 'markerPositionChange', newPosition: [newPosition.lat, newPosition.lng]})
			}
		}
		}
		), [],
	)*/

    useEffect(() => {
      if (props.open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [props.open]);
  
    return (
        <>
            <Dialog
                open={props.open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
            <DialogTitle 
                id="scroll-dialog-title"
                sx={{backgroundColor: '#000000', color: '#ffffff', fontWeight: 'bold'}}
            >
               Update Listing <ModeEditIcon fontSize="small" sx={{mx:1}} />
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                    sx={{ padding: '0' }}
                >
                    <div style={{display:"flex", justifyContent:"center", marginTop:'0.5rem'}}>
                        <Card 
                            variant="outlined"
                            sx={{maxWidth:"95%", minWidth: "95%", padding:'0.5rem'}}
                        >
                            <CardContent >
                                {/* <---- TEXT FIELDS ----> */}
                                <Divider sx={{fontWeight:500, my:3}}>
                                    Overview
                                </Divider>
                                {/* <---- TITLE ----> */}
                                <TextField 
                                    id="Title"
                                    variant="outlined" 
                                    fullWidth 
                                    label="Title"
                                    value={state.titleValue}
                                    onChange={(e) =>  setState((prevState) => {
                                        return {
                                          ...prevState,
                                          titleValue: e.target.value,
                                        };
                                    })}
                                    sx={{ marginBottom: 3 }} 
                                /><br/>
                                {/* <---- LISTING TYPE ----> */}
                                <TextField 
                                    select
                                    id="ListingType"
                                    variant="filled"
                                    fullWidth 
                                    label="Listing Type"
                                    value={state.listingTypeValue}
                                    onChange={(e) =>  setState((prevState) => {
                                        return {
                                          ...prevState,
                                          listingTypeValue: e.target.value,
                                        };
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
                                    label="Description"
                                    value={state.descriptionValue}
                                    onChange={(e) =>  setState((prevState) => {
                                        return {
                                          ...prevState,
                                          descriptionValue: e.target.value,
                                        };
                                    })}
                                    sx={{ marginBottom: 3 }} 
                                /><br/>
                                {/* <---- PROPERTY STATUS ----> */}
                                <TextField 
                                    select
                                    id="propertystatus"
                                    variant="filled" 
                                    fullWidth 
                                    label="Property Status"
                                    value={state.propertyStatusValue}
                                    onChange={(e) =>  setState((prevState) => {
                                        return {
                                          ...prevState,
                                          propertyStatusValue: e.target.value,
                                        };
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
                                        value={state.rentalFrequencyValue}
                                        label="Rental Frenquency"
                                        onChange={(e) =>  setState((prevState) => {
                                            return {
                                              ...prevState,
                                              rentalFrequencyValue: e.target.value,
                                            };
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
                                    label="Price"
                                    value={state.priceValue}
                                    onChange={(e) =>  setState((prevState) => {
                                        return {
                                          ...prevState,
                                          priceValue: e.target.value,
                                        };
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
                                    label="Rooms"
                                    value={state.roomsValue}
                                    onChange={(e) =>  setState((prevState) => {
                                        return {
                                          ...prevState,
                                          roomsValue: e.target.value,
                                        };
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
                                                onChange={(e) =>  setState((prevState) => {
                                                    return {
                                                      ...prevState,
                                                      furnishedValue: !state.furnishedValue,
                                                    };
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
                                                onChange={(e) =>  setState((prevState) => {
                                                    return {
                                                      ...prevState,
                                                      poolValue: !state.poolValue,
                                                    };
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
                                            onChange={(e) =>  setState((prevState) => {
                                                return {
                                                  ...prevState,
                                                  cctvValue: !state.cctvValue,
                                                };
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
                                                onChange={(e) =>  setState((prevState) => {
                                                    return {
                                                      ...prevState,
                                                      elevatorValue: !state.elevatorValue,
                                                    };
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
                                                onChange={(e) =>  setState((prevState) => {
                                                    return {
                                                      ...prevState,
                                                      parkingValue: !state.parkingValue,
                                                    };
                                                })}
                                            />
                                        } 
                                    />
                                </FormGroup>

                                {/* <---- SELECTS ----> */}
                                
                                <Divider sx={{fontWeight:500, my:3}}>
                                    Location
                                </Divider>
                                <CardHeader sx={{textAlign:'center'}} subheader="Select an area or drag the marker to your prefered location"/>
                                <Grid item container justifyContent="space-between">
                                    <Grid item xs={5}>
                                        <TextField 
                                            id="area"
                                            variant="filled"
                                            fullWidth 
                                            label="Area"
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
                                            label="Borough"
                                            value={state.boroughValue}
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

                                {/* <---- MAP ----> 
                                
                                <MapContainer center={state.markerPosition} zoom={13} scrollWheelZoom={true} style={{height:"55vh", margin: '1rem', border: "2px solid black"}}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <MapComponent/>
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
                                </MapContainer>*/}

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
                                                onChange={(e) =>  setState((prevState) => {
                                                    return {
                                                      ...prevState,
                                                      uploadedPicture: e.target.files[0],
                                                    };
                                                })}
                                            />
                                        </Button>
                                    </Tooltip>
                                </Grid>
                                <Grid item container justifyContent="center" alignItems="center" flexDirection="column">
                                    {state.uploadedPicture ? <><h3>Uploaded:</h3><ul><li>{state.uploadedPicture.name}</li></ul></> : <></>}
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' onClick={updateListing}>Update</Button>
            </DialogActions>
            </Dialog>
            <Snackbar
                open={dialogOpen}
                autoHideDuration={5000}
                onClose={handleDialogClose}
                message={snackbarMessage}
                severity="success"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		    />
        </>
  )
}

export default UpdateListingDialog