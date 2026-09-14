const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
     from:{
        type: String,
        required: true
     },
     to: {
        type: String,
        required : true
     },
     msg: {
        type: String,
        maxLength: 120
     },
     amount: {
        type: Number,
        required: true,
        min: 1
     },
     semester: {
        type: String,
        enum: ["2nd Semester", "5th Semester", "7th Semester"],
        required: true
     },
     food_preference: {
        type: String,
        enum: ["Veg", "Non-Veg"]
     },
     payment_method: {
        type: String,
      enum: ["UPI", "Card", "Net banking", "Wallet", "Cash"],
        default: "UPI"
     },
     status: {
        type: String,
        enum: ["Successful", "Pending", "Failed"],
        default: "Successful"
     },
     transaction_id: {
        type: String,
        unique: true,
        default: () => `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
     },
     created_at: {
        type: Date,
        required: true
     }
});

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;