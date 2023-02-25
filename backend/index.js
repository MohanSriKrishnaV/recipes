const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const secret = "recipe";
app.use(cors());
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const user = require("./model/user");
const post = require("./model/post")
const jwt = require("jsonwebtoken")

const url = "mongodb+srv://recipe:recipe@cluster0.hi669ze.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connection success")
    }
})



app.post("/form", async (req, res) => {

    try {
        const { rt, a, img, i, rd } = req.body;
        const new_post = await post.create({
            title: rt,
            author: a,
            image: img,
            ingredients: i,
            directions: rd
        })
        res.status(200).json({ status: "success", data: new_post })
    } catch (e) {
        res.json({
            status: "failed",
            e: e.message
        })
    }
})


app.post("/login", async (req, res) => {
    try {
        const { ea, p } = req.body;
        const find_user = await user.findOne({ email: ea });
        console.log(find_user);

        if (!find_user) {
            return res.status(400).json({ status: "failed", msg: "user not registered" })
        }

        bcrypt.compare(p, find_user.password, function (err, result) {

            if (err) {
                return res.json({ msg: err.message })
            }


            if (result) {
                const { _id, ea, p } = find_user;
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                }, secret);
                return res.json({ status: "success", token, user: { _id, ea, p } })
            }
            else {
                return res.json({ status: "failed credits" })
            }
        })

    }
    catch (e) {
        res.json({
            status: "failed",
            e: e.message
        })
    }

})



app.post("/registration", async (req, res) => {
    try {
        console.log("req", req.body);
        const { ea, p } = req.body;
        console.log(ea, p);
        const x = await user.findOne({ email: ea });
        console.log("found", x);
        if (x) {
            return res.status(401).json({ status: "user already exsists" })
        }

        bcrypt.hash(p, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ status: "failed hash", msg: err.message })
            }
            const new_user = await user.create({ email: ea, password: hash });
            return res.status(200).json({ status: "reg success", new_user })

        })

    } catch (e) {
        res.json({
            status: "failed final",
            e: e.message
        })
    }
})


app.get("/form", async (req, res) => {
    let data = await post.find({ user: req.user });
    res.status(200).json({ status: "success", data: data })
})



app.listen(8080, () => {
    console.log("listening to port 8080")
});
