import mongoose from "mongoose";
const dbconnet = async () => {
    try {
        const connectionInstance = await mongoose.connect(
           `${process.env.DB_URI}/${process.env.DBNAME}` 
        );
        console.log(
            `MongoDB connected Successfully || ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log(error.message);
    }
};

export default dbconnet;