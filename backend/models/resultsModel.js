import mongoose from "mongoose";

const resultsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medicines: {
    type: [],
    required: true,
  },
  medicinesInfo:{
    type: [],
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Results = mongoose.model("Results", resultsSchema);
export default Results;
