const express = require('express');
const connectDB = require('./DB/conn');
const upload = require('./middleware/multerConfig');
const File = require('./Models/fileModel');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { filename, mimetype, size } = req.file;
        const filepath = `/uploads/${filename}`;

        const file = new File({ filename, filepath, mimetype, size });
        await file.save();

        res.json({ message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed' });
    }
});

// get files Route
app.get('/files', async (req, res) => {
    try {
        const files = await File.find();
        if(files.length ===  0) return res.status(401).json({
            message : "no files found"
        })
        res.staus(200).json({
            files
        })
    } catch (error) {
        res.status(500).json({ error: 'Error fetching files' });
    }
});


module.exports = app;