import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Button, FormControl, Grid, MenuItem, TextField} from "@material-ui/core";
import {baseUrl} from "../shared/baseUrl";


export default function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = event => {

        /* send data to database */
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                age: age,
                gender: gender,
                collection_location: location
            })
        };

        fetch(baseUrl + "/subjects", requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    localStorage.setItem('subject', JSON.stringify(data));
                },
                (error) => {
                    console.log(error);
                }
            )

        let path = `/videos`;
        navigate(path, {
            state: {name: firstName}
        });
    }

    /*useEffect(() => {
        fetch("http://localhost:8000/subjects")
            .then(res => res.json())
            .then(
                (data) => {
                   console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])*/

    return (
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center">


            <form onSubmit={handleSubmit}>
                <h2 style={{textAlign: "center"}}>Registration Form</h2>

                {/* location */}
                <FormControl fullWidth>
                    <TextField required select label="Location" value={location}
                               onChange={event => setLocation(event.target.value)}>
                        <MenuItem value='lab01'>Lab 01</MenuItem>
                        <MenuItem value='lab02'>Lab 02</MenuItem>
                    </TextField><br/>
                </FormControl>

                {/* first name */}
                <FormControl fullWidth>
                    <TextField required label="First Name" value={firstName}
                               onChange={event => setFirstName(event.target.value)}/> <br/>
                </FormControl>

                {/* last name */}
                <FormControl fullWidth>
                    <TextField required label="Last Name" value={lastName}
                               onChange={event => setLastName(event.target.value)}/> <br/>
                </FormControl>

                {/* age */}
                <FormControl fullWidth>
                    <TextField required label="Age" value={age} onChange={event => setAge(event.target.value)}/> <br/>
                </FormControl>

                {/* gender */}
                <FormControl fullWidth>
                    <TextField required select label="Gender" value={gender}
                               onChange={event => setGender(event.target.value)}>
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                    </TextField><br/>
                </FormControl>

                <FormControl fullWidth>
                    <Button type="submit" variant="contained" style={{marginTop: 20}}>
                        Register
                    </Button>
                </FormControl>

            </form>
        </Grid>
    )
}