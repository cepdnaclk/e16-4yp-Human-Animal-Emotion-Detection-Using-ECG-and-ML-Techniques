import React from "react";
import { useNavigate } from 'react-router-dom';



export default function Register(){
    let navigate = useNavigate();
    function handleSubmit(values) {
        let path = `/videos`;
        navigate(path);
    }

    return(
        <div>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={(values) => handleSubmit(values)}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Subject Registration Form </h3>
                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="first name"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="last name"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Age</label>
                            <input
                                type="number"
                                className="form-control mt-1"
                                placeholder="age in years"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Gender</label>
                            <select >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}