const connectDB = require("../Connection/conn");
const bcrypt = require('bcrypt')
connectDB(); 
const express = require('express');
const User = require('../Models/Userdata');
const app = express();
const port = 3000;

//CREATE
app.use(express.json());
app.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }
        const savedData = new User({ username, password });
        await savedData.save();

        res.status(201).json({ message: "User created successfully!", user: savedData });

    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message });
    }
});

//READ
app.get('/users', async (req, res) => {
    try {
        const data = await User.find({});
        res.status(200).json({ users: data });

    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

//UPDATE
app.put('/update', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await User.findOneAndUpdate({ username },{ password: hashedPassword }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: "User updated successfully!", user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});


//Delete
app.delete('/delete', async (req, res) => {
    try {
        const { username} = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username and password are required!" });
        }
        const deletduser = await User.deleteOne({ username });

        res.status(200).json({ message: "User Deleted successfully!", deletduser});

    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});

module.exports = app;
