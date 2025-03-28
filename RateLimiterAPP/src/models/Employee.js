const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    empName : {
        type : String,
        required : true
    },
    emp_id : {
        type : String,
        unique : true,
        required : true
    },
    role : {
        type : String,
        required : true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;