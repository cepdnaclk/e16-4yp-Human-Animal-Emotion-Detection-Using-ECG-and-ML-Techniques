import {Component, React} from "react";
import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    Paper, Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";


class FeedbackComponent extends Component {

    state = {
        valance: 0, arousal: 0, dominance: 0, showValance: true, showArousal: false, showDominance: false,
        showClimaxForm: false, climaxes: [], emotions: ['Happy', 'Sad']
    };
    /* list of all emotions*/
    selectedEmotion;
    start;
    end;
    handleSubmit = () => {
        /*remove emotion from the emotion list and put the climax into the array*/
        let temp = this.state.climaxes;
        temp.push([this.selectedEmotion, this.start, this.end])
        this.setState({climaxes: temp});
        console.log(this.state.climaxes);
    };

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <div hidden={!this.state.showValance} style={{width: '75%', marginLeft: 50}}>
                            <h3>Valance</h3>
                            <h5>Select the valance level felt</h5>
                            <img src={'SAM1.jpg'} height='200px' width='100%' alt={'valance '}/>
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

                        <div hidden={!this.state.showArousal} style={{width: '75%', marginLeft: 50}}>
                            <h3>Arousal</h3>
                            <h5>Select the arousal level felt</h5>
                            <img src={'SAM1.jpg'} height='200px' width='100%' alt={'valance '}/>
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

                        <div hidden={!this.state.showDominance} style={{width: '75%', marginLeft: 50}}>
                            <h3>Dominance</h3>
                            <h5>Select the dominance level felt</h5>
                            <img src={'SAM1.jpg'} height='200px' width='100%' alt={'valance '}/>
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
                                <source src="../videos/video3.mp4" type="video/mp4"/>
                            </video>

                            <form onSubmit={this.handleSubmit}>
                                <FormControl style={{width: '40%', margin: 4}}>
                                    <TextField required select id="emotion" variant="outlined" label="Select emotion"
                                               onChange={(event) => {
                                                   this.selectedEmotion = event.target.value
                                               }}>
                                        {this.state.emotions.length === 0 ? <MenuItem> Null</MenuItem> :
                                            this.state.emotions.map((emo) => (
                                                <MenuItem value={emo} key={emo}>{emo}</MenuItem>
                                            ))}
                                    </TextField>
                                </FormControl>
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
                                <FormControl style={{width: '40%', margin: 4, marginTop: 13}}>
                                    <Button type="submit" size="large" variant="contained" >Add</Button>
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
                                                <TableRow><TableCell></TableCell><TableCell> No Entries to Show</TableCell></TableRow> : this.state.climaxes.map(value => (
                                                    <TableRow key={value[0]}
                                                              sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                        <TableCell>{value[0]}</TableCell>
                                                        <TableCell>{value[1]}</TableCell>
                                                        <TableCell>{value[2]}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Button variant="contained" style={{marginTop: 10}}>
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