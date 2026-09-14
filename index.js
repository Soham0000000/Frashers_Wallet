require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const mongoose = require("mongoose");//define mongoose
const path = require("path");//define path
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const session = require("express-session");
const ExpressError = require("./ExpressError.js");

const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fakewhatsapp";

//use views folder
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");//ejs use
app.use(express.static(path.join(__dirname,"public"))); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SESSION_SECRET || "local-payment-history-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" }
}));

function requireAdmin(req, res, next) {
    if (req.session.isAdmin) {
        return next();
    }
    res.status(403).send("Only the admin can remove payment records.");
}

//mongoose use
main().catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
});

async function main(){
    await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000
    });
    console.log("connection successful!");
}
app.get("/",(req,res)=>{
    res.redirect("/chats");
});
//Index Route
app.get("/chats",async (req,res)=>{
    const semesters = ["2nd Semester", "5th Semester", "7th Semester"];
    const selectedSemester = semesters.includes(req.query.semester) ? req.query.semester : "all";
    const filter = selectedSemester === "all" ? {} : { semester: selectedSemester };
    let chats = await Chat.find(filter).sort({ created_at: -1 });
    res.render("index.ejs", { chats, selectedSemester, isAdmin: Boolean(req.session.isAdmin), success: req.query.success === "1" });
});

app.get("/admin/login", (req, res) => {
    res.render("login.ejs", { error: false });
});

app.post("/admin/login", (req, res) => {
    if (req.body.password !== adminPassword) {
        return res.status(401).render("login.ejs", { error: true });
    }
    req.session.isAdmin = true;
    res.redirect("/chats");
});

app.post("/admin/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/chats"));
});

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Create Route
app.post("/chats",async (req,res,next)=>{
    try{
        let { from, to, msg, amount, semester, food_preference, payment_method } = req.body;
        let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        amount: Number(amount),
        semester: semester,
        food_preference: food_preference || undefined,
        payment_method: payment_method,
        status: "Successful",
        created_at: new Date()
    });
    await newChat.save();
    res.redirect("/chats?success=1");
    } catch(err){
        next(err);
    }
    
});
//NEW - show Route
app.get("/chats/:id",async(req,res,next)=>{
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        return next(new ExpressError(404,"chat not found"));
    }
    res.render("edit.ejs", { chat, isAdmin: Boolean(req.session.isAdmin) });
});

//Edit Route
app.get("/chats/:id/edit", async (req,res)=>{
    let{ id } = req.params;
   let chat = await Chat.findById(id);

    res.render("edit.ejs", { chat, isAdmin: Boolean(req.session.isAdmin) });
    
});

//Update Route
app.put("/chats/:id", requireAdmin, async (req,res,next)=>{
    let { id } = req.params;
    let { from, to, amount, semester, food_preference, payment_method, status, msg } = req.body;

    try {
        let updatedChat = await Chat.findByIdAndUpdate(id, {
            from,
            to,
            amount: Number(amount),
            semester,
            food_preference: food_preference || undefined,
            payment_method,
            status,
            msg
        }, { runValidators: true, new: true });
        if (!updatedChat) {
            return next(new ExpressError(404, "chat not found"));
        }
        res.redirect(`/chats/${id}`);
    } catch (err) {
        next(err);
    }
});
//Destroy Route
app.delete("/chats/:id", requireAdmin, async(req,res)=>{
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.redirect("/chats");
});

//Error Handling Middleware
app.use((err,req,res,next)=>{
    let { status = 500 , message = "Some Error Occured"} = err;
    res.status(status).send(message);
});

app.listen(port,(req,res)=>{
    console.log(`app listening on port ${port}`)
});