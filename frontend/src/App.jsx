// React and router-dom
import React, { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
//Components
import Home from './Components/Home'
import Register from './Components/register'
import Login from './Components/Login'
import Listings from './Components/Listings'
import { useImmerReducer } from "use-immer";
import AddProperty from './Components/AddProperty'
// Contexts
import DispatchContext from './Contexts/DispatchContext'
import StateContext from './Contexts/StateContext'

function App() {
	const initialState = {
		userName: localStorage.getItem('username'),
		userEmail: localStorage.getItem('email'),
		userId: localStorage.getItem('userID'),
		userToken: localStorage.getItem('userToken'),
		userLoggedIn: localStorage.getItem('username') ? true : false,
	}
	
	const [state, dispatch] = useImmerReducer(reducer, initialState)

	function reducer(state, action){
		switch (action.type){
			case "catchToken":
				state.userToken = action.tokenValue;
				break;
			case "catchUserInfo":
				console.log("Action value on reducer function:", action)	
				state.userId = action.userInfo.id;
				state.userName = action.userInfo.username;
				state.userEmail = action.userInfo.email;
				state.userLoggedIn = true;
				break;
			case 'userLoggedOut':
				state.userLoggedIn = false;
				break;
		}
	}

	useEffect(() => {
		if (state.userLoggedIn){
			localStorage.setItem('username', state.userName)
			localStorage.setItem('email', state.userEmail)
			localStorage.setItem('userID', state.userId)
			localStorage.setItem('userToken', state.userToken)
		}
		else{
			localStorage.removeItem('username')
			localStorage.removeItem('email')
			localStorage.removeItem('userID')
			localStorage.removeItem('userToken')
		}
	}, [state.userLoggedIn])
 
	
	return (
	<div style={{height:"100%"}}>
		<StateContext.Provider value={state}>
		<DispatchContext.Provider value={dispatch}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/Login" element={<Login/>}/>
					<Route path="/Register" element={<Register/>}/>
					<Route path="/listings" element={<Listings/>}/>
					<Route path="/addproperty" element={<AddProperty/>}/>
				</Routes>
			</BrowserRouter>
		</DispatchContext.Provider>
		</StateContext.Provider>
	</div>
	)
}

export default App
