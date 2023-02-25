import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
    const [rt, setrt] = useState("");
    const [a, seta] = useState("");
    const [img, setimg] = useState("");
    const [i, seti] = useState("");
    const [rd, setrd] = useState("");
    const navigate = useNavigate();



    const formsubmit = async () => {
        const formData = new FormData();
        formData.append("recipe-title", rt);
        formData.append("author", a);
        formData.append("img-link", img);
        formData.append("ingr", i);
        formData.append("directions", rd);
        // console.log(formData)
        console.log("form submission")

        const resp = await fetch("http://localhost:8080/form", {
            method: 'POST',
            // mode: "no-cors",
            headers: { "Content-type": "application/json", 'Accept': 'application/json', "Authorization": localStorage.getItem("jwt") },
            body: JSON.stringify({ rt, a, img, i, rd }),
        });

        navigate("/home")
        // const response = await resp.json();
        // console.log(response);
    }
    return (



        <>
            <h1>Create a recipe</h1>
            <h5>share a recipe with the club by completing the form below</h5>

            <div>
                <label>Recipe title</label>
                <input type="text" onChange={(e) => { setrt(e.target.value) }} name="rt"></input>
            </div>
            <div>
                <label>Author</label>
                <input type="text" onChange={(e) => { seta(e.target.value) }} name="author"></input>
            </div>
            <div>
                <label>Please upload your image </label>
                <input onChange={(e) => { setimg(e.target.value) }} name="img"></input>
            </div>
            <div>
                <label>Ingredients</label>
                <input onChange={(e) => { seti(e.target.value) }} name="ingr"></input>
            </div>

            <div>
                <label>Recipe directions</label>
                <input onChange={(e) => { setrd(e.target.value) }} name="rd"></input>
            </div>
            <button onClick={formsubmit}>Submit</button>
        </>

    )
}

export default Form

