import {Component, React} from "react";
import {
    Button, Checkbox,
    FormControl, FormControlLabel,
    Grid,
    Paper,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {baseUrl} from "../shared/baseUrl";

class FeedbackComponent extends Component {

    state = {
        valance: 0, arousal: 0, dominance: 0, showValance: true, showArousal: false, showDominance: false,
        showClimaxForm: false, climaxes: [],
        emotions: ['Relief', 'Anxiety', 'Happy', 'Sad', 'Surprise', 'Irritation', 'Disgust', 'Fear', 'Amusement', 'Anger',   'Interest',  'Joy', 'Neutral'  ],
        climaxesAsString: [], label: '', felt: false, relavant_emotion: ''
    };
    /* list of all emotions*/
    selectedEmotion;
    start;
    end;

    componentDidMount() {

        const windowPath = (window.location.href).split('/');
        const id = windowPath[windowPath.length - 1];
        console.log(id)
        const path = "../videos/video".concat(id.toString()).concat(".mp4");
        this.setState({path: path});
        this.setState({label: "Did you felt ".concat(this.state.emotions[id-1].toString())});
        this.setState({relavant_emotion:this.state.emotions[id-1].toString() })

    }


    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <div hidden={!this.state.showValance} style={{width: '75%', marginLeft: 200}}>
                            <h3>Positivity and Negativity of the Emotion </h3>
                            <h5>Select the positive, negative level of the emotion you felt. Valence is a measure of pleasure,
                                defined by a polarity of positive or negative feelings.</h5>
                            <img src={"../capture1.jpg"} height='200px' width='100%' alt={'valance '}/>
                            <div>Level: {this.state.valance}</div>
                            <Slider aria-label="Valance" size='medium' value={this.state.valance}
                                    onChange={(event, val) => {
                                        this.setState({valance: val});
                                    }} defaultValue={this.state.valance}
                                    valueLabelDisplay="auto" step={1} min={0} max={10} marks={true}/>
                            <Button variant="contained" onClick={() => {
                                this.setState({showValance: false, showArousal: true})
                            }}>Next</Button>
                        </div>

                        <div hidden={!this.state.showArousal} style={{width: '75%', marginLeft: 200}}>
                            <h3>Arousal</h3>
                            <h5>arousal describes the level of activation and intensity concerning emotional
                                stimulation, varying from low/calmness to high/excitement, or even passive and active.</h5>
                            <img src={"../capture2.jpg"} height='200px' width='100%' alt={'valance '}/>
                            <div>Level: {this.state.arousal}</div>
                            <Slider aria-label="Arousal" size='medium' value={this.state.arousal}
                                    onChange={(event, val) => {
                                        this.setState({arousal: val});
                                    }} defaultValue={this.state.arousal}
                                    valueLabelDisplay="auto" step={1} min={0} max={10} marks={true}/>
                            <Button variant="contained" onClick={() => {
                                this.setState({showValance: true, showArousal: false})
                            }} style={{marginRight: 50}}>Previous</Button>
                            <Button variant="contained" onClick={() => {
                                this.setState({showArousal: false, showDominance: true})
                            }}>Next</Button>
                        </div>

                        <div hidden={!this.state.showDominance} style={{width: '75%', marginLeft: 200}}>
                            <h3>Dominance</h3>
                            <h5>Dominance is related to the subject’s feeling of
                                control, indicating if the human feels without control or empowered (dominant vs. submissive)</h5>
                            <img src={"../capture3.jpg"} height='200px' width='100%' alt={'valance '}/>
                            <div> Level: {this.state.dominance}</div>
                            <Slider aria-label="Dominance" size='medium' value={this.state.dominance}
                                    onChange={(event, val) => {
                                        this.setState({dominance: val});
                                    }} defaultValue={this.state.dominance}
                                    valueLabelDisplay="auto" step={1} min={0} max={10} marks={true}/>
                            <Button variant="contained" onClick={() => {
                                this.setState({showDominance: false, showArousal: true})
                            }} style={{marginRight: 50}}>Previous</Button>
                            <Button variant="contained" onClick={() => {
                                this.setState({showDominance: false, showClimaxForm: true})
                            }}>Finish</Button>
                        </div>
                    </Grid>
                </Grid>

                {/* feedback submission form for climaxes */}

                <div hidden={!this.state.showClimaxForm}>
                    <Grid container spacing={0} style={{marginLeft: 50}}>
                        <Grid item xs={6}>
                            <h3>Select Climaxes</h3>
                            <video id="video" width='80%' height="65%" controls>
                                <source src={this.state.path}/>
                            </video>

                            <form>
                                <FormControl style={{width: '60%', margin: 4}}>
                                    <FormControlLabel
                                        value="felt"
                                        control={<Checkbox />}
                                        label={this.state.label}
                                        labelPlacement="start"
                                        onChange={() => {
                                            this.setState({felt: !this.state.felt});
                                        }}
                                    />
                                </FormControl>
                                {/*<FormControl style={{width: '40%', margin: 4}}>
                                    <TextField required select id="emotion" variant="outlined" label="Select emotion"
                                               onChange={(event) => {
                                                   this.selectedEmotion = event.target.value
                                               }}>
                                        {this.state.emotions.length === 0 ? <MenuItem> Null</MenuItem> :
                                            this.state.emotions.map((emo) => (
                                                <MenuItem value={emo} key={emo}>{emo}</MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>*/}
                                <FormControl style={{width: '40%', margin: 4}}>
                                    <TextField required id="start" variant="outlined" label="Start of the climax"
                                               onChange={(event) => {
                                                   this.start = event.target.value
                                               }}/>
                                </FormControl>
                                <FormControl style={{width: '40%', margin: 4}}>
                                    <TextField required id="end" variant="outlined" label="End of the climax"
                                               onChange={(event) => {
                                                   this.end = event.target.value
                                               }}/>
                                </FormControl>
                                <FormControl style={{width: '40%', margin: 4, marginTop: 13, marginLeft: 150}}>
                                    <Button onClick={() => {
                                        let temp = this.state.climaxes;
                                        temp.push([this.relavant_emotion, this.start, this.end])
                                        this.setState({climaxes: temp});

                                        let clStr = this.state.climaxesAsString;
                                        clStr.push(this.start.toString().concat("-").concat(this.end.toString()));
                                        this.setState({climaxesAsString: clStr});
                                        /* remove selected emotion from the drop-down ** don't remove if user can add more than one climax */

                                        /*let emoTemp = this.state.emotions;
                                        emoTemp.splice(emoTemp.indexOf(this.selectedEmotion), 1);
                                        this.setState({emotions: emoTemp});*/
                                    }} size="large" variant="contained">Add</Button>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item xs={5} style={{marginRight: 30, marginTop: 40}}>
                            <div>
                                <h4>Entered Climaxes</h4>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Emotion</TableCell><TableCell>Start</TableCell><TableCell>End</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.climaxes.length === 0 ?
                                                <TableRow><TableCell></TableCell><TableCell> No Entries to
                                                    Show</TableCell></TableRow> : this.state.climaxes.map(value => (
                                                    <TableRow key={this.state.relavant_emotion}
                                                              sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                        <TableCell>{this.state.relavant_emotion}</TableCell>
                                                        <TableCell>{value[1]}</TableCell>
                                                        <TableCell>{value[2]}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Button variant="contained" style={{marginTop: 10}} onClick={({route, navigation, ...props}) => {
                                  const sub_de = JSON.parse(localStorage.getItem('subject_details'));
                                  const file_name = sub_de.first_name.concat('_').concat(this.state.relavant_emotion).concat(".json");
                                    // Data which will write in a file.
                                    let data = JSON.stringify({
                                        //"subject_id": "636773ec85925a79825203b0",
                                        "first_name": sub_de.first_name,
                                        "last_name": sub_de.last_name,
                                        "age": sub_de.age,
                                        "gender": sub_de.gender,
                                        "location": sub_de.location,
                                        "emotion": this.state.relavant_emotion,
                                        "emotion_success": this.state.felt,
                                        "ecg_readings": [],
                                        "climaxes": this.state.climaxesAsString,
                                        "valence": this.state.valance,
                                        "arousal": this.state.arousal,
                                        "dominance": this.state.dominance
                                    });

                                    const url = window.URL.createObjectURL(new Blob([data]));
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.setAttribute(
                                        'download',
                                        file_name,
                                    );

                                    document.body.appendChild(link);
                                    link.click();
                                    link.parentNode.removeChild(link);
                    
                                    const requestOptions = {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body:JSON.stringify({
                                            "subject_id": JSON.parse(localStorage.getItem('subject'))._id,
                                            "emotion": this.state.relavant_emotion,
                                            "emotion_success": this.state.felt,
                                            "ecg_readings": [],
                                            "climaxes": this.state.climaxesAsString,
                                            "valence": this.state.valance,
                                            "arousal": this.state.arousal,
                                            "dominance": this.state.dominance
                                        })
                                    };

                                    fetch(baseUrl + "/ecgdata", requestOptions)
                                        .then(res => res.json())
                                        .then(
                                            (data) => {
                                                console.log("ECG data sent");
                                                console.log(requestOptions);
                                                localStorage.setItem('ecgdata', JSON.stringify(data));
                                            },
                                            (error) => {
                                                console.log(error);
                                            }
                                        )
                                         .then( () => {
                                           window.location.replace("/videos")
                                        })


                                }

                                }>
                                    Submit All Records
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }
}

export default FeedbackComponent;