import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import {serialUrl} from "../shared/baseUrl";

export default function PlayVideo() {

    const {id} = useParams();
    const [isDisabled, setIsDisabled] = useState(false);
    const path = "../videos/video".concat(id.toString()).concat(".mp4");
    const navigate = useNavigate();
    const emotions = ['Relief', 'Anxiety', 'Happy', 'Sad', 'Surprise', 'Irritation', 'Disgust', 'Fear', 'Neutral', 'Amusement', 'Anger',   'Interest',  'Joy'  ];

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    const end = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        };

        fetch(serialUrl + "/stop", requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            )

        sleep(1000); /* sleep for 1s*/
        navigate('/feedback/'.concat(id.toString()));
    }

    const handlePlay = () => {
    
        /** TODO
         * use the id sent from the API
         */
        let video = document.getElementById('video');
        const windowPath = (window.location.href).split('/');
        const emotion_id = windowPath[windowPath.length - 1];
        video.requestFullscreen();
        video.play();
        /* start storing data */
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "subjectId": JSON.parse(localStorage.getItem('subject_details')).first_name, /* get from local storage*/
                "emotion": emotions[emotion_id-1]
            })
        };

        fetch(serialUrl + "/start", requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            )

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