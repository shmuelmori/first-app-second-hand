const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const detaileClientSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    mail: String,
  },
  { timestamps: true }
);

const DetaileClient = mongoose.model("DetaileClient", detaileClientSchema);

app.get("/showDetaile", (req, res) => {
  DetaileClient.find((err, data) => {
    if (err) res.send("sory, there is a problem fetchung the data");
    res.send(data);
  });
});

app.get("/showById/:id", (req, res) => {
  const { id } = req.params;

  DetaileClient.findById(id, (err, data) => {
    if (err) res.send("sory, there is a problem fetchung the data");
    res.json(data);
  });
});

app.post("/adDetaile", (req, res) => {
  const { name, phone, mail } = req.body;
  const client = new DetaileClient({ name, phone, mail });

  client.save((err, client) => {
    if (err) res.send("sory, there is a problem to use in the data");
    res.send(client);
  });
});

app.put("/changeName/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  DetaileClient.findOneAndUpdate(id, { name }, { new: true }, (err, data) => {
    if (err) res.send("sory, there is a problem to use in data");
    res.send(data);
  });
});

app.delete("/deleteDetaile/:id", (req, res) => {
  const { id } = req.params;

  DetaileClient.findByIdAndDelete(id, (err, todo) => {
    if (err) res.send("sory, there is a problem to delete the data");
    res.send(todo);
  });
});

const { DB_PASS, DB_USER, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  // "mongodb://localhost:27017/detaileClient",
  {},
  app.listen(5000, () => {
    console.log("listening...");
  })
);
