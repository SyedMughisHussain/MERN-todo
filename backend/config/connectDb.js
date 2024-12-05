import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to Database Successfully');
    } catch (error) {
        res.status(400).json({
            message: 'Failed to connect to the database.'
        }) 
    }
}

export default connectDb;