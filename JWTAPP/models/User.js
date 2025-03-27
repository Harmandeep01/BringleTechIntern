const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function() {
    try{
        const token =  jwt.sign({_id:this._id.toString()}, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error) {
        console.log(error);
    }
};


const User = mongoose.model("User", userSchema);
module.exports = User;
