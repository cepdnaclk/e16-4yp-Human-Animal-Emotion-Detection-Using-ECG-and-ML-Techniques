import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";

export default function PlayVideo() {

    const {id} = useParams();
    const [isDisabled, setIsDisabled] = useState(false);
    const path = "../videos/video".concat(id.toString()).concat(".mp4");
    const navigate = useNavigate();

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    const end = () => {
        sleep(1000); /* sleep for 1s*/
        navigate('/feedback');
    }

    const handlePlay = () => {
        let video = document.getElementById('video');
        video.requestFullscreen();
        video.play();
        /* start storing data */
        console.log("Played");
        setIsDisabled(true);

    }
    return (
        <Grid container spacing={2} style={{marginLeft: 150, marginTop: 40}} >
            <Grid item xs={12}  >
                <video  id="video" width= '800px' height="500px" controls={false} onEnded={end} >
                    <source src={path} type="video/mp4"/>
                </video>
            </Grid>
            <Grid item xs={2} style={{textAlign: "center"}}>
                <Button disabled={isDisabled} onClick={handlePlay} variant="contained" >PLAY</Button>
            </Grid>
        </Grid>

    );
}