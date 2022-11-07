import mongoose from "mongoose";

const ecgDataSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    emotion: {
      type: String,
      required: true,
    },

    emotion_success: {
      type: Boolean,
      required: true,
    },

    ecg_readings: {
      type: [Number],
      required: true,
    },

    climaxes: {
      type: [String],
      required: true,
    },

    valence: {
        type: Number,
        required: true,
    },

    arousal: {
        type: Number,
        required: true,
    },

    dominance: {
        type: Number,
        required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("ECGData", ecgDataSchema);
