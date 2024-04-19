import mongoose from 'mongoose';
export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: 'work_manager',
    });
    console.log('Db Connected !!!!');
  } catch (error) {
    console.log('Failed with connection');
    console.log(error);
  }
};
