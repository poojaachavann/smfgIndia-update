import mongoose from "mongoose";

const connectDB = async  ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.mongoDb_URL}`)
        
        console.log('mongoDb connection successfull');
        
    } catch (error) {
        console.log('mongoDb Connection Failed----->', error)
        process.exit(1)
    }
}


export default connectDB