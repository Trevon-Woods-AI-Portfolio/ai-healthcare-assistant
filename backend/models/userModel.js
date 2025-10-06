import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  firstLogin: {
    type: Boolean,
    default: true,
  }
});

const User = mongoose.model("User", userSchema);
export default User;