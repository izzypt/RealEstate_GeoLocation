// React and router-dom
import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
//Components
import Home from './Components/Home'
import Register from './Components/register'
import Login from './Components/Login'
import Listings from './Components/Listings'
import { useImmerReducer } from "use-immer";

// Contexts
import DispatchContext from './Contexts/DispatchContext'
import StateContext from './Contexts/StateContext'

function App() {
	const initialState = {
		userName: '',
		userEmail: '',
		userId: '',
		globalMessage: "Hello, this message can bue used by any child component"
	}

	function reducer(state, action){
		switch (action.type){
			case "userLoggedIn":
				state.userName = "izzypt"
				state.globalMessage = "Hello, if you are seeing this message, the user logged in!!";
				break;
		}
	}
 
	const [state, dispatch] = useImmerReducer(reducer, initialState)
	return (
	<div className="App">
		<StateContext.Provider value={state}>
		<DispatchContext.Provider value={dispatch}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/Login" element={<Login/>}/>
					<Route path="/Register" element={<Register/>}/>
					<Route path="/listings" element={<Listings/>}/>
				</Routes>
			</BrowserRouter>
		</DispatchContext.Provider>
		</StateContext.Provider>
	</div>
	)
}

export default App
