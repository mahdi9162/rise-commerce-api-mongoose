import mongoose from 'mongoose';
import env from './env';

const connectDB = async () => {
  try {
    await mongoose.connect(env.database_url);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection failed', error);

    process.exit(1);
  }
};

export default connectDB;
