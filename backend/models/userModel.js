const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // confirmPassword:{type:String,required:true}
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);
// Compare between two passwords -  return true/false
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// This function  will be executed just before saving a user
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  // To encrypt the pasword
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;
