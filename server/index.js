const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//Schema Section
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    address: String,
    lat: String,
    long: String,
  },
  {
    timestamps: true,
  }
);
const userModal = mongoose.model("user", schemaData);

// Mongo DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/form");

//Data Reading Section
app.get("/", async (req, res) => {
  const data = await userModal.find({});
  res.json({ success: true, data: data });
});

//Data Creating Section
app.post("/create", async (req, res) => {
  const data = new userModal(req.body);
  await data.save();
  res.send({ success: true, message: "Data added successfully" });
});

// update data

app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  const data = await userModal.updateOne({ _id: _id }, rest);
  res.send({
    success: true,
    message: "The data updated succssfully",
    data: data,
  });
});

// Delete Data

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await userModal.deleteOne({ _id: id });
  res.send({
    success: true,
    message: "The data delete succssfully",
    data: data,
  });
});

app.listen(PORT, () => console.log("The server will be start"));
