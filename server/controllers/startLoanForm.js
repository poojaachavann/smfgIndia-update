import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import signIn from '../models/signin.models.js';
import util from 'util';

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputpath = path.join(__dirname, '../');
const uniqueId = uuidv4();


const getPythonCommand = (script, filePath, userId, domain) => {
    const pythonInterpreter = domain === "localhost:5173"
        ? 'C:\\SMFG-UPDATED\\smfgIndia-update\\server\\smfgEnv\\Scripts\\python.exe'
        : 'python3.11';

    return `${pythonInterpreter} ${script} --file_path "${filePath}" --uuid "${userId}" --process_id "${uniqueId}"`;
};

const readJson = async (userId, filename) => {
    const jsonPath = path.join(outputpath, 'assets', `uid-${userId}`, `pid-${uniqueId}`, filename);
    const data = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(data);
};
export const startLoanForm = async (req, res) => {
    try {
        const {
            bankStatementpdfPath,
            idProofpdfPath,
            creditBureopdfPath,
            userId,
            domain,
            type
        } = req.body;


        if (type === 'idProof') {
            const idCommand = getPythonCommand('main_id_manger.py', idProofpdfPath, userId, domain);
            console.log(`Executing: ${idCommand}`);
            await execPromise(idCommand);

            const idData = await readJson(userId, 'id_proof-combined_manifest.json');
            await signIn.updateOne({ _id: userId }, { $push: { 'file_response.idProof': idData } });

            return res.status(200).json({ answer: idData, uniqueId });
        }

        if (type === 'bankStatement') {
            const bankCommand = getPythonCommand('main_bank_statement_manger.py', bankStatementpdfPath, userId, domain);
            console.log(`Executing: ${bankCommand}`);
            await execPromise(bankCommand);

            const bankData = await readJson(userId, 'bank_statement-combined_manifest.json');
            await signIn.updateOne({ _id: userId }, { $push: { 'file_response.bankStatement': bankData } });

            return res.status(200).json({ answer: bankData, uniqueId });
        }

        if (type === 'creditBureau') {
            const creditCommand = getPythonCommand('main_credit_buero_manger.py', creditBureopdfPath, userId, domain);
            console.log(`Executing: ${creditCommand}`);
            await execPromise(creditCommand);

            const creditData = await readJson(userId, 'credit_report-combined_manifest.json');
            await signIn.updateOne({ _id: userId }, { $push: { 'file_response.creditBureau': creditData } });

            return res.status(200).json({ answer: creditData, uniqueId });
        }

        return res.status(400).json({ error: 'Invalid type provided' });

    } catch (error) {
        console.error('Error processing loan form:', error);
        return res.status(500).json({ error: 'Failed to process loan form', details: error.message });
    }
};
