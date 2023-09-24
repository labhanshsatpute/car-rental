import mongoose from 'mongoose';

const dbConnection = () => {
    try {

        const connectionUrl: string = process.env.APP_MONGODB_URL!;

        const connectionParams: Object = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        };

        mongoose.connect(connectionUrl, connectionParams);
        console.log('Database successfully connected');
        
    } catch (error) {
        console.log('Database connecttion error : ' + error);
    }
}

export default dbConnection;