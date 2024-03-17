import mongoose from 'mongoose';

export async function connect() {
  try {
    if (mongoose.connections[0].readyState) return;

    mongoose.connect(process.env.DB_URI_MCCPL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running. ' + err
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something goes wrong!');
    console.log(error);
  }
}
