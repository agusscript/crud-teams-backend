const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/indexRoutes");
const PORT = process.env.PORT || 8080;

app.use(express.static("../public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRoutes);

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
