const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username :{
        type : String,
        unique : true,
        required : true
    },
    password:{
        type : String,
        required : true
    }
},
{
    timestamps : true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
        next(err);
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;