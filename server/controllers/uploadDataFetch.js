import uploadSchema from '../models/signin.models.js';


export const uploadDataFetch = async (req, res) => {
    try {

        const uploadedData = await uploadSchema.find().sort({ createdAt: -1 });

        res.status(200).json({
            uploadedData,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong', error: error.message });
    }
};
