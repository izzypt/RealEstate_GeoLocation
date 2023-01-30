import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SecondComponent from './Components/SecondComponent'
import Home from './Components/Home'
import Register from './Components/register'
import Login from './Components/Login'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/Login" element={<Login/>}/>
				<Route path="/Register" element={<Register/>}/>
			</Routes>
		</BrowserRouter>
    </div>
  )
}

export default App
