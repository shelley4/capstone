import React, { useEffect } from "react";
import { useState } from "react";

function SignUp(addAuditionee) {

    const [role, setRole] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selection, setSelectionPiece] = useState("");
    const [auditionees, setAuditionees] = useState([]);
    const [allPeople, setPeople] = useState([]);

    const baseurl = window.API_URL + "/api/theater/auditionee";

    useEffect(() => {
        getAuditionees();
    }, []);

    const getAuditionees = () => {

        fetch("http://localhost:8080/api/theater/auditionee", { method: "GET" })
            .then(resp => {
                if (resp.status !== 200) {
                    return Promise.reject("response is not ok");
                }
                return resp.json();
            })
            .then(json => {
                setAuditionees(json);
            });
    }

    console.log(auditionees);
    var correctId;

    if (auditionees.length === 0) {
        correctId = 1;
    }
    else if(auditionees.length === 2){
        correctId = 3;
    } 
    else {
        var index = auditionees.length - 1;
        console.log(index);
        var tempAuditionee = auditionees[index];
        console.log(tempAuditionee);
        correctId = tempAuditionee.auditioneeId + 1;
        console.log(correctId);
    }


    const auditionPost = () => {


        const newAudition = { auditioneeId: correctId, partId: parseInt(role, 10) };

        console.log(newAudition);

        const auditionInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newAudition)
        };

        return fetch("http://localhost:8080/api/theater/audition", auditionInit)
            .then(response => {
                console.log(response.status);
                if (response.status === 201) {
                } else {
                    return Promise.reject("POST failed.")
                }
            })
            .catch(console.error);
    }

    const auditioneePost = () => {

        const init = { // initialize the GET request
            method: "GET"
        };



        return fetch(`http://localhost:8080/api/theater/auditionee/${correctId}`, init)
            .then(response => {
                if (response.status !== 200) { //No Auditionee in Database
                    var auditionee = {
                        appUserId: parseInt(localStorage.getItem("id"), 10),
                        partId: parseInt(role, 10),
                        timeSlot: date + " " + time,
                        selection: selection
                    }

                    console.log(auditionee);

                    const anotherInit = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        body: JSON.stringify(auditionee)
                    };

                    fetch(baseurl, anotherInit)
                        .then(response => {
                            console.log(response.status);
                            if (response.status === 201) { // status CREATED
                            } else {
                                return Promise.reject("POST auditionee status was not 201.");
                            }

                        })
                        .catch(console.error);
                }
                else {
                    alert("There is already an audition for this user. Please edit it in the 'My Account' Section, or make a different user");
                }
            })
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

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await auditioneePost();
        await auditionPost();

        //Set to blank
        setRole("");
        setDate("");
        setTime("");
        setSelectionPiece("");
    };


    return (
        <div>
            {true? 
        <form onSubmit={handleSubmit}>
            <div class="container">
                <div class="row">
                    <h2 class="col">Audition Sign Up</h2>
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
                        <input autoComplete="off" id="selection" onChange={handleSelectionChange} name="selection" type="Text" value={selection}></input>
                    </div>
                </div>
                {(role === "" || date === "" || time === "" || selection === "")
                    ? <button className="btn btn-secondary" disabled>Add Audition</button>
                    : <button className="btn btn-primary" type="submit">Add Audition</button>
                }
            </div>
        </form>
        : <></>}
        </div>
    );
}

export default SignUp