import mongoose from 'mongoose';

const config = {
  isConnected: 0,
};

export const connectDb = async () => {
  try {
    if (config.isConnected) {
      return;
    }

    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: 'work_manager',
    });
    console.log('Db Connected !!!!');
    config.isConnected = connection.readyState;
  } catch (error) {
    console.log('Failed with connection');
    console.log(error);
  }
};
