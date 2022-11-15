import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Button, FormControl, Grid, MenuItem, TextField} from "@material-ui/core";


export default function Register(){
    let navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = event =>{
        let path = `/videos`;
        navigate(path, {
            state: {name: firstName,}
        });
        setFirstName('');
        setLastName('');
        setAge('');
        setGender('');
    }

    return(
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center">


        <form onSubmit={handleSubmit}>
            <h2 style={{textAlign: "center"}}>Registration Form</h2>

            {/* first name */}
            <FormControl fullWidth>
            <TextField required label="First Name"  value={firstName} onChange={event => setFirstName(event.target.value)}/> <br/>
            </FormControl>

            {/* last name */}
            <FormControl fullWidth>
            <TextField required label="Last Name" value={lastName} onChange={event => setLastName(event.target.value)}/> <br/>
            </FormControl>

            {/* age */}
            <FormControl fullWidth>
            <TextField  required label="Age" value={age} onChange={event => setAge(event.target.value)}/> <br/>
            </FormControl>
            {/* gender */}
            <FormControl fullWidth>
                <TextField required select label="Gender" value={gender} onChange={event => setGender(event.target.value)}>
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                </TextField>
            </FormControl>

            <FormControl fullWidth>
            <Button type="submit" variant="contained" style={{marginTop: 20}} >
                Register
            </Button>
        </FormControl>

        </form>
        </Grid>
    )
}