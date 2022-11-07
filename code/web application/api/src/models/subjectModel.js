import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
      required: true,
    },

    collection_location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
