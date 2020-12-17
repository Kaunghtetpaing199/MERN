const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
