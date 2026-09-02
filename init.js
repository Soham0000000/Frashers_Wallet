const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(()=>{
        console.log("connection successful!");
    }).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
     {
        from: "rohit",
        to: "rajib",
        msg: "send me videos",
        created_at: new Date(),
    },
     {
        from: "saniya",
        to: "sneha",
        msg: "send me notes",
        created_at: new Date(),
    },
     {
        from: "soham",
        to: "ankit",
        msg: "send me videos",
        created_at: new Date(),
    },
     {
        from: "keya",
        to: "sona",
        msg: "send me books Links",
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);