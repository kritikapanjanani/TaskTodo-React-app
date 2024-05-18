const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//create
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title,body,user:existingUser });
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list);
            await existingUser.save();
            res.status(200).json({ list });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });
      
        const list=await List.findByIdAndUpdate(req.params.id,{title,body});
        list.save().then(()=>res.status(200).json({message :"task updated"}));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const {id} = req.body;
        const existingUser = await User.findByIdAndDelete(id,{$pull:{list:req.params.id}});
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).then(()=>res.status(200).json({message :"task updated"}));
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//getTask
router.get("/getTasks/:id",async(req,res)=> {
    const list = await List.find({ user: req.params.id }).sort({ createdAt:-1});
    if(list.length !== 0){
        res.status(200).json({ list : list });
    }
    else{
        res.status(200).json({ "message":"No Task Created "});
    }
});
module.exports= router;
