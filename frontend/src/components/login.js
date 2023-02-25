import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
const Login = () => {

    const [ea, setea] = useState("");
    const [p, setp] = useState("");
    const navigate = useNavigate();
    const [reply, setreply] = useState("")

    const login = async () => {

        const resp = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ ea, p })
        })

        const dat = await resp.json();
        console.log(dat);
        setreply(dat);
        if (dat.token) {
            localStorage.setItem("jwt", dat.token);
            localStorage.setItem("user", JSON.stringify(dat.ea))
            navigate("/home")
        }
        else {
            navigate("/signup")
        }
    }
    return (
        <>
            <h1>Sign In</h1>
            <div>
                <label>Email address</label>
                <input type="email" placeholder="Enter email" onChange={(e) => {
                    setea
                        (e.target.value
                        )
                }}></input>
            </div>

            <div>
                <label>Password</label>
                <input placeholder="Enter password" onChange={(e) => {
                    setp(e.target.value)
                }}></input>
            </div>

            <div>
                <input type="checkbox"></input>
                <label>Remeber me</label>
            </div>
            <button onClick={login}>Submit
            </button>
        </>



    )
}

export default Login

