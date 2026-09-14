const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(()=>{
        console.log("connection successful!");
    }).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

let allChats = [
     {
        from: "rohit",
        to: "rajib",
        msg: "Monthly subscription",
        amount: 499,
        payment_method: "UPI",
        status: "Successful",
        created_at: new Date(),
    },
     {
        from: "saniya",
        to: "sneha",
        msg: "Dinner split",
        amount: 850,
        payment_method: "Card",
        status: "Successful",
        created_at: new Date(),
    },
     {
        from: "soham",
        to: "ankit",
        msg: "Movie tickets",
        amount: 620,
        payment_method: "Wallet",
        status: "Successful",
        created_at: new Date(),
    },
     {
        from: "keya",
        to: "sona",
        msg: "Books",
        amount: 1200,
        payment_method: "Net banking",
        status: "Successful",
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);