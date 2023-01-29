import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SecondComponent from './Components/SecondComponent'
import Home from './Components/Home'
import Register from './Components/register'



function App() {
  const [count, setCount] = useState(0)
  function MyComponents(){
    return (
	<React.Fragment>
		<h1>This is my first component</h1>
	</React.Fragment>
    )
  }
  return (
    <div className="App">
		
		<BrowserRouter>
		<Routes>
			<Route path="/firstComponent" element={<h1>App component</h1>}/>
			<Route path="/myComponent" element={<MyComponents/>}/>
			<Route path="/SecondComponent" element={<SecondComponent/>}/>
			<Route path="/Register" element={<Register/>}/>
			<Route path="/" element={<Home/>}/>
		</Routes>
		</BrowserRouter>
    </div>
  )
}

export default App
