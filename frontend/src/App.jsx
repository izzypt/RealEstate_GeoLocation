import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import SecondComponent from './Components/SecondComponent'
import './App.css'



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
      <h1>App component</h1>
      <MyComponents></MyComponents>
      <SecondComponent></SecondComponent>
    </div>
  )
}

export default App
