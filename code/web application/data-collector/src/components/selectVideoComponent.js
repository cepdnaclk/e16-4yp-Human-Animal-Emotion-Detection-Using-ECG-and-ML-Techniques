import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import * as PropTypes from "prop-types";


function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
export default function SelectVideo() {
    const location = useLocation();
    let navigate = useNavigate();
    let name = "";
    name = location.state ? location.state.name : name;
    return (
        <div style={{textAlign: "center"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div >
                        <h3> Name: {name.toUpperCase()} </h3>
                        <h3> Subject ID: XXX </h3>
                    </div>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                    <ul style={{listStyle: "none"}}>
                        <li><Button variant="contained" onClick={() => navigate("/play/1")} style={{marginTop: 20}}>Video
                            01</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/2")} style={{marginTop: 20}}>Video
                            02</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/3")} style={{marginTop: 20}}>Video
                            03</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/4")} style={{marginTop: 20}}>Video
                            04</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/5")} style={{marginTop: 20}}>Video
                            05</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/6")} style={{marginTop: 20}}>Video
                            06</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/7")} style={{marginTop: 20}}>Video
                            07</Button></li>
                    </ul>
                </Grid>
                <Grid item xs={3}>
                    <ul style={{listStyle: "none"}}>
                        <li><Button variant="contained" onClick={() => navigate("/play/8")} style={{marginTop: 20}}>Video
                            08</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/9")} style={{marginTop: 20}}>Video
                            09</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/10")} style={{marginTop: 20}}>Video
                            10</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/11")} style={{marginTop: 20}}>Video
                            11</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/12")} style={{marginTop: 20}}>Video
                            12</Button></li>
                        <li><Button variant="contained" onClick={() => navigate("/play/13")} style={{marginTop: 20}}>Video
                            13</Button></li>
                    </ul>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}