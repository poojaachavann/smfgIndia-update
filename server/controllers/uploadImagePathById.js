import documentSchema from "../models/signin.models.js";

export const updatefilePath = async (req, res) => {
  const { id } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const file_path = {
    idProof: req.files?.idProofFile?.[0]?.path || null,
    bankStatement: req.files?.bankStatementFile?.[0]?.path || null,
    creditBureau: req.files?.creditBureauFile?.[0]?.path || null
  };

  try {
    const updatedData = await documentSchema.findByIdAndUpdate(
      id,
      { $set: { file_path } },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.status(200).json({
      message: 'File path updated successfully',
      updatedData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating file path', error });
  }
};
