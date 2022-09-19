const express = require("express");
const app = express();
const port = 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/",require("./routes"));


app.listen(port,(err) => {
    if(err){
        console.log("Error in starting the server");
    }
    console.log(`Server is running at port ${port}`);
})