import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';



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
        <div>
            <div >
                <form onSubmit={ handleSubmit}>
                    <div >
                        <h3 >Subject Registration Form </h3>
                        <div >
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="first name"
                                id="firstname"
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </div>
                        <div >
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="last name"
                                id="lastname"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Age</label>
                            <input
                                type="number"
                                placeholder="age in years"
                                id="age"
                            />
                        </div>
                        <div >
                            <label>Gender</label>
                            <select id="gender" >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        <div >
                            <button type="submit" >
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}