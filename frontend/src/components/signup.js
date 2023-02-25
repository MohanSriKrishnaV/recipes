import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Sign = () => {
    const [ea, setea] = useState("");
    const [p, setp] = useState("");
    const [cp, setcp] = useState("");
    const [msg, setmsg] = useState(false);
    const [reply, setreply] = useState(null);
    const navigate = useNavigate()

    const checkp = () => {
        if (p !== cp) {
            setmsg(true)
        }
        else {
            setmsg(false)
        }
    }

    const registration = async () => {


        // setea("")

        const resp = await fetch("http://localhost:8080/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                ea, p
            })
        });
        const dat = await resp.json();
        console.log(dat.new_user);
        setreply(dat.new_user);
        let x = dat.new_user;
        if (x) {
            navigate("/")
        }

    }

    return (
        <>
            <h1>Sign Up</h1>
            <div>
                <input placeholder="EMAIL" onChange={(e) => { setea(e.target.value) }}></input>
            </div>

            <div>
                <input placeholder="PASSWORD" onChange={(e) => { setp(e.target.value) }}></input>
            </div>

            <div>
                <input placeholder=" REPEAT PASSWORD" onChange={(e) => { setcp(e.target.value) }} onBlur={checkp}></input>
            </div>
            <div>

                {msg ? (<p>password and repeat password dont match</p>) : null}
            </div>

            <div>
                <input type="checkbox"></input>
                <label> I agree with TERMS & CONDITIONS</label>
            </div>
            <button onClick={registration}>CONTINUE
            </button>
        </>



    )
}

export default Sign

