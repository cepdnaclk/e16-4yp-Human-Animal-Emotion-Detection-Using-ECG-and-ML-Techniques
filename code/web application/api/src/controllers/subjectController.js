import mongoose from "mongoose";
import Subject from "../models/subjectModel";

export const getAllSubjects = (req, res) => {
  console.log(`GET : getAllSubjects`);

  Subject.find()
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

export const createSubject = (req, res) => {
  console.log(`POST : createSubject`);
  
  const { first_name, last_name, age, gender, collection_location } = req.body;

  const newSubject = new Subject({
    _id: new mongoose.Types.ObjectId(),
    first_name,
    last_name,
    age,
    gender,
    collection_location,
  });

  newSubject
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(409).json({ message: error });
    });
};

export const getSubjectbyId = (req, res) => {
  console.log(`GET : getSubjectbyId`);
  const { id } = req.params;

  Subject.find({ _id: id })
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
