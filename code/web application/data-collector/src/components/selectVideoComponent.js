import React  from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@material-ui/core";


export default function SelectVideo({navigation}) {
    const location = useLocation();
    let navigate = useNavigate();
    let name = location.state? location.state.name : " ";
    return (
        <div>
        <div>
           Subject Name: {name.toUpperCase()}
        </div>
        <div>
            Subject ID: XXX
        </div>
            <div>
                <ul>
                    <li ><Button variant="contained" onClick={() => navigate("/play/1")} >Video 01</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/2")} >Video 02</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/3")} >Video 03</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/4")} >Video 04</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/5")} >Video 05</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/6")} >Video 06</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/7")} >Video 07</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/8")} >Video 08</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/9")} >Video 09</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/10")} >Video 10</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/11")} >Video 11</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/12")} >Video 12</Button></li>
                    <li ><Button variant="contained" onClick={() => navigate("/play/13")} >Video 13</Button></li>

                </ul>
            </div>
        </div>
    );
}