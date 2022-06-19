import React, { useEffect } from "react";
import { useState } from "react";

function SignUp(addAuditionee) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selection, setSelectionPiece] = useState("");

    const baseurl = "http://localhost:8080/api/theater/auditionee";


    const handleFirstChange = (evt) => {
        setFirstName(evt.target.value);
    }
    const handleLastChange = (evt) => {
        setLastName(evt.target.value);
    }
    const handleRoleChange = (evt) => {
        setRole(evt.target.value);
    }
    const handleDateChange = (evt) => {
        setDate(evt.target.value);
    }
    const handleTimeChange = (evt) => {
        setTime(evt.target.value);
    }
    const handleSelectionChange = (evt) => {
        setSelectionPiece(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        var auditionee = {
            appUserId: localStorage.getItem("id"),
            partId: parseInt(role, 10),
            timeslot: date + " " + time,
            selection: selection
        }

        console.log(auditionee);

        const init = { // initialize the GET request
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body : JSON.stringify(auditionee)
        };

        fetch(baseurl, init)
            .then(response => {
                if (response.status === 201) { // status CREATED
                } else {
                    return Promise.reject("POST auditionee status was not 201.");
                }

            })
            .catch(console.error);


        //Set to blank
        setFirstName("");
        setLastName("");
        setRole("");
        setDate("");
        setTime("");
        setSelectionPiece("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="container">
                <div class="row">
                    <h2 class="col">Audition Sign Up</h2>
                </div>
                <div class="row">
                    <label htmlFor="firstName">First Name: </label>
                    <div class="col-3">
                        <input id="firstName" onChange={handleFirstChange} name="firstName" type="Text" value={firstName}></input>
                    </div>
                </div>
                <div class="row">
                    <label htmlFor="lastName">Last Name: </label>
                    <div class="col-3">
                        <input id="lastName" onChange={handleLastChange} name="lastName" type="Text" value={lastName}></input>
                    </div>
                </div>
                <div class="row">
                    <label htmlFor="roles">Role: </label>
                    <div class="col-3">
                        <select id="roles" name="roles" class="col-100" onChange={handleRoleChange} value={role}>
                            <option value="" disabled selected>Choose Role</option>
                            <option value="1" >Actor</option>
                            <option value="2">Singer</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <label htmlFor="dates">Date: </label>
                    <div class="col-3">

                        <select id="dates" name="dates" class="col-100" onChange={handleDateChange} value={date}>
                            <option value="" disabled selected>Choose Date</option>
                            <option value="2022-07-01">July 1st</option>
                            <option value="2022-07-02">July 2nd</option>
                            <option value="2022-07-03">July 3rd</option>
                        </select>
                    </div>
                </div>
                {(date === "")
                    ? <div></div>
                    :
                    <div class="row">
                        <label htmlFor="times">Time: </label>
                        <div class="col-3">
                            <select id="times" name="times" class="col-100" onChange={handleTimeChange} value={time}>
                                <option value="" disabled selected>Choose Time</option>
                                <option value="9:00am">9 am</option>
                                <option value="10:00am">10 am</option>
                                <option value="11:00am">11 am</option>
                            </select>
                        </div>
                    </div>
                }
                <div class="row">
                    <label htmlFor="auditionPiece">Selection Piece: </label>
                    <div class="col-3">
                        <input id="selection" onChange={handleSelectionChange} name="selection" type="Text" value={selection}></input>
                    </div>
                </div>
                {(role === "" || date === "" || firstName === "" || lastName === "" || time === "" || selection === "")
                    ? <button className="btn btn-secondary" disabled>Add Audition</button>
                    : <button className="btn btn-primary" type="submit">Add Audition</button>
                }

            </div>

        </form>
    );
}

export default SignUp