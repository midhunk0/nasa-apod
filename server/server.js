const express=require("express");
const cors=require("cors");
const routes=require("./route");
const dotenv=require("dotenv").config();

const app=express();
const port=4000;

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});