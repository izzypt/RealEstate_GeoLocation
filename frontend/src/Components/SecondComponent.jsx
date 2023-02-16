import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function SecondComponent(){
    const navigate = useNavigate();
    return <h3>Please <Link to="/login"><span style={{cursor: "pointer", color: "blue"}}>login</span></Link> to see this page.</h3>
}

export default SecondComponent