import mongoose, { Schema } from 'mongoose';
import { Employee } from '../interface/data/employee.interface';

const employeeSchema = new mongoose.Schema<Employee>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
  },
  { timestamps: true },
);

export const employeeModel = mongoose.model('employee', employeeSchema);
