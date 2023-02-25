import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./landing.css"
const Landing = () => {

    const [data, setdata] = useState([]);
    const [dish, setdish] = useState(false);
    const [list, setlist] = useState(true);
    const [e, sete] = useState(null);
    const [x, setx] = useState([]);
    const [i, showi] = useState(false);
    const [d, showd] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/form").then((res) => { return res.json() }).then((prev) => {
            setdata(prev.data);
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log(data);

    const expand = async (event) => {
        setdish(true);
        console.log(event.target)
        sete(event.target.value);
        setx(data);
        console.log("prex", x);
        let z = x.filter(y => y._id == e);
        setx([...z]);
        console.log("z", z);
    }


    const logout = () => {
        localStorage.removeItem("jwt");
        // window.location.reload();
        navigate("/")
    }

    return (
        <>
            <h1>RECIPE APP</h1>
            <div>
                <input type="text"></input>
            </div>
            <button onClick={() => { navigate("/form") }}>NEW</button>

            <h3>All recipes</h3>
            <div id="flex">


                {list ? data.map((value, key) => {
                    return (

                        <div value={value._id} onClick={(e) => { setdish(true); expand(e) }} className="holder">
                            <img className="images" src={value.image}></img>
                        </div>
                    )
                }) : null}

                {dish ?
                    x.length !== 0 && x.map((value) => {
                        return (
                            <>
                                <h4 onClick={() => { showi(true) }}>Ingredients</h4>
                                <h4 onClick={() => { showd(true) }}>Instructions</h4>


                                {i ? (<div>{value.ingredients}</div>
                                ) : null}

                                {d ? (<div>{<div>{value.directions}</div>
                                }</div>
                                ) : null}


                            </>
                        )
                    }) : null}
            </div>
            <button id="logout" onClick={logout}>Log out</button>
        </>



    )
}

export default Landing;

