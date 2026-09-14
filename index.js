const express = require("express");
const port = 8080;
const app = express();
const mongoose = require("mongoose");//define mongoose
const path = require("path");//define path
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

//use views folder
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");//ejs use
app.use(express.static(path.join(__dirname,"public"))); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//mongoose use
main()
    .then(()=>{
        console.log("connection successful!");
    }).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.get("/",(req,res)=>{
    res.redirect("/chats");
});
//Index Route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{ chats });
});

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Create Route
app.post("/chats",(req,res)=>{
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
    .then((res) => console.log("Chats was saved!"))
    .catch((err) => console.log(err));

    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req,res)=>{
    let{ id } = req.params;
   let chat = await Chat.findById(id);

    res.render("edit.ejs", { chat });
    
});

//Update Route
app.put("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let { msg: newMsg } = req.body;

    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg},{runValidators: true ,new : true});
    console.log(updatedChat);
    res.redirect("/chats");
});
//Destroy Route
app.delete("/chats/:id", async(req,res)=>{
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("server is working!!");
});
app.listen(port,(req,res)=>{
    console.log(`app listening on port ${port}`)
});