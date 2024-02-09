const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
require("dotenv").config();

const app = express();
port = process.env.port;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static images folder
app.use(express.static("upload"));

// route prefix
app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`server renning on port http://localhost:${port}`);
});
