const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/canvasify");

// Order model
const Order = mongoose.model("Order", {
    name: String,
    phone: String,
    address: String,
    items: Array,
    total: Number
});

// API to save order
app.post("/order", async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.send({ message: "Order saved!" });
});

// API to get orders (admin)
app.get("/orders", async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
