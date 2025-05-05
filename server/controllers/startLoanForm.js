import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import signIn from '../models/signin.models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputpath = path.join(__dirname, `../`)


export const startLoanForm = async (req, res) => {
    const { pdfPath, userId, domain } = req.body

    const uniquedId = uuidv4()

    const pythonCommand = `${domain === "localhost:5173" ? 'C:\\smfgIndiaUpdate\\server\\smfgUpdateEnv\\Scripts\\python.exe main_bank_statement_manger.py' : 'python3.11 main_bank_statement_manger.py'} --file_path "${pdfPath}" --uuid "${userId}" --process_id "${uniquedId}"`;

    console.log(`Executing command: ${pythonCommand}`);

    exec(pythonCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: 'Error executing Python script', details: error.message });
        }
        const jsonPath = path.join(outputpath, 'assets', `uid-${userId}`, `pid-${uniquedId}`, `combined_manifest.json`);
        console.log(jsonPath)

        fs.readFile(jsonPath, 'utf8', async (err, data) => {
            if (err) throw err
            try {
                const parsedData = JSON.parse(data);
                console.log('parsedData', parsedData)

                await signIn.updateOne(
                    { _id: userId },
                    { $push: { file_response: parsedData } }
                );

                return res.status(200).json({ answer: parsedData, uniquedId: uniquedId })

            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Error processing AI response', details: error.message });
            }

        });

    });
};

