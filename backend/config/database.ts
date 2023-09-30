import mongoose from 'mongoose';

const dbConnection = () => {
    try {

        mongoose.connect(process.env.APP_MONGODB_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as object);
        console.log('Database successfully connected');
        
    } catch (error) {
        console.log('Database connecttion error : ' + error);
    }
}

export default dbConnection;