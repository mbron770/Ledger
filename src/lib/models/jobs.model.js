import mongoose from "mongoose";
import { jobSchema } from "../models/job.model";

const jobsSchema = new mongoose.Schema({
  jobID: {type: String}, 
  job:[jobSchema]
});

export { jobsSchema };

