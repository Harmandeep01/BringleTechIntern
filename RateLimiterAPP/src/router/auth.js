const express = require('express')
const router = express.Router();
const limiter = require('../middleware/limitMiddleWare');
const Employee = require('../models/Employee');

router.use(express.json())
router.post('/register', limiter, async (req, res) => {
    console.log('Request Received')
    try {
        console.log(req.body);
        const { empName, emp_id, role } = req.body;


        if (!empName || !emp_id || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        const alreadyRegistered = await Employee.find({empName});
        if(alreadyRegistered) return res.status(400),json({
            alert :'User Already registered!'
        })

        const employee = await new Employee({ empName, emp_id, role }).save();


        return res.status(201).json({ employee });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router