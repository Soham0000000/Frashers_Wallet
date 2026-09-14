const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const students = [
    ["Deep Chakraborty", 300, "Non-Veg"],
    ["Abhijit Dey", 300, "Non-Veg"],
    ["Riya Adhikari", 250, "Non-Veg"],
    ["Indra Prakash Giri", 240, "Non-Veg"],
    ["Sneha Rajchoudhuri", 280, "Non-Veg"],
    ["Piyama Prodhan", 200, "Non-Veg"],
    ["Santu Ojha", 250, "Non-Veg"],
    ["Sheovan Das", 300, "Non-Veg"],
    ["Bishwanath Singh", 250, "Non-Veg"],
    ["Norsota Khan", 250, "Veg"],
    ["Asmita Das", 200, "Non-Veg"],
    ["Priyanka Kanek", 200, "Non-Veg"],
    ["Dipika Maity", 200, "Non-Veg"],
    ["Prithuchi Polley", 250, "Non-Veg"],
    ["Jagannath Jana", 300, "Non-Veg"],
    ["Animesh Jana", 250, "Non-Veg"],
    ["Sumitra Bhuiyan", 250, "Non-Veg"],
    ["Monisha Khatun", 250, "Non-Veg"],
    ["Balaram Kurumu", 250, "Veg"],
    ["Debaroti Ghosh", 250, "Non-Veg"],
    ["Debangshu Rana", 200, "Non-Veg"],
    ["Arman Mahato", 230, "Veg"],
    ["Dona Singh", 250, "Veg"],
    ["Swarup Pandit", 250, "Veg"],
    ["Vikram Aditya Singh", 250, "Non-Veg"],
    ["Smritisekha Kisku", 250, "Veg"],
    ["Raja", 200, "Veg"],
    ["Debjit", 250, "Non-Veg"],
    ["Joydeep Basak", 200, "Non-Veg"],
    ["Nandini Manna", 250, "Non-Veg"],
    ["Ramtan Jana", 200, "Veg"]
];

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
    const existing = await Chat.find({
        semester: "5th Semester",
        to: "Freshers & Teachers Day 2026"
    }).select("from").lean();
    const existingNames = new Set(existing.map((chat) => chat.from));
    const records = students
        .filter(([from]) => !existingNames.has(from))
        .map(([from, amount, food_preference]) => ({
            from,
            to: "Freshers & Teachers Day 2026",
            msg: "Freshers & Teachers Day 2026",
            amount,
            semester: "5th Semester",
            food_preference,
            payment_method: "Cash",
            status: "Successful",
            created_at: new Date()
        }));

    if (records.length) {
        await Chat.insertMany(records);
    }
    console.log(`Imported ${records.length} new 5th-semester records (${students.length} total in source list).`);
    await mongoose.disconnect();
}

main().catch(async (error) => {
    console.error(error);
    await mongoose.disconnect();
    process.exitCode = 1;
});