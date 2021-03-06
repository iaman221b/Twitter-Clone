import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created: {
    type: Date,
    default: Date.now,
    index:true
  }
});

UserSchema.index({ created: -1 }); // schema level



export const User = mongoose.model("User", UserSchema);
