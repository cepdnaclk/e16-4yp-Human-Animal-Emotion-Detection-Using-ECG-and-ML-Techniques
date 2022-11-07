import mongoose from "mongoose";
import ECGData from "../models/ecgDataModel";

export const getAllECGData = (req, res) => {
  console.log(`GET : getAllECGData`);

  ECGData.find()
    .exec()
    .then(
      (result) => {
        res.status(200).json(result);
      },
      (error) => {
        res.status(400).json({ message: error });
      }
    );
};

export const createECGData = (req, res) => {
  console.log(`POST : createECGData`);

  const {
    subject_id,
    emotion,
    emotion_success,
    ecg_readings,
    climaxes,
    valence,
    arousal,
    dominance,
  } = req.body;

  const newECGData = new ECGData({
    _id: new mongoose.Types.ObjectId(),
    subject_id,
    emotion,
    emotion_success,
    ecg_readings,
    climaxes,
    valence,
    arousal,
    dominance,
  });

  newECGData
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(409).json({ message: error });
    });
};

export const getECGDatabyId = (req, res) => {
  console.log(`GET : getECGDatabyId`);
  const { id } = req.params;

  ECGData.find({ _id: id })
    .exec()
    .then(
      (result) => {
        res.status(200).json(result);
      },
      (error) => {
        res.status(400).json({ message: error });
      }
    );
};
